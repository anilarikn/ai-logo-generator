from abc import ABC, abstractmethod
from datetime import datetime, timedelta, timezone
import json
import random
from typing import Dict, Any

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

        task: Dict[str, Any] = {
            "http_request": {
                "http_method": tasks_v2.HttpMethod.POST,
                "url": url,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps(payload).encode(),
            }
        }

        delay_min = int(settings.job_delay_min)
        delay_max = int(settings.job_delay_max)
        print(f"Enqueuing task with delay between {delay_min} and {delay_max} seconds.")

        now = datetime.now(timezone.utc)
        delay_seconds = random.randint(delay_min, delay_max)

        schedule_dt = now + timedelta(seconds=delay_seconds)
        schedule_time_proto = timestamp_pb2.Timestamp()
        schedule_time_proto.FromDatetime(schedule_dt)

        task["schedule_time"] = schedule_time_proto

        try:
            self._client.create_task(request={"parent": self._parent, "task": task})
        except Exception as exc:
            raise errors.JobPersistenceError("Failed to enqueue Cloud Task") from exc