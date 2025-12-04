from abc import ABC, abstractmethod
from time import time
from datetime import datetime, timedelta, timezone
import json
from typing import Dict

from google.cloud import tasks_v2
from google.protobuf import timestamp_pb2

from core.config import settings
from core import errors


class TaskQueue(ABC):

    @abstractmethod
    def enqueue_logo_generation(self, job_id: str) -> None:
        ...


class CloudTasksQueue(TaskQueue):

    def __init__(self) -> None:
        self._client = tasks_v2.CloudTasksClient()
        self._parent = self._client.queue_path(
            settings.gcp_project_id,
            settings.gcp_location,
            settings.tasks_queue,
        )

    def enqueue_logo_generation(self, job_id: str) -> None:
        url = f"{settings.base_api_url}{settings.task_internal_path.format(job_id=job_id)}"

        payload: Dict[str, str] = {"job_id": job_id}

        task: Dict = {
            "http_request": {
                "http_method": tasks_v2.HttpMethod.POST,
                "url": url,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps(payload).encode(),
            }
        }

        delay_seconds = settings.job_delay_seconds

        schedule_timestamp = time() + delay_seconds
        schedule_time_proto = timestamp_pb2.Timestamp(seconds=int(schedule_timestamp))

        task["schedule_time"] = schedule_time_proto

        try:
            self._client.create_task(request={"parent": self._parent, "task": task})
        except Exception as exc:
            raise errors.JobPersistenceError("Failed to enqueue Cloud Task") from exc
