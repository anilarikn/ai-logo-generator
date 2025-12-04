from functools import lru_cache

from infrastructure.job_repository import FirebaseJobRepository
from infrastructure.tasks_queue import CloudTasksQueue
from infrastructure.image_storage import GCSImageStorage
from services.jobs_service import JobService


@lru_cache
def get_job_service() -> JobService:
    repo = FirebaseJobRepository()
    task_queue = CloudTasksQueue()
    image_storage = GCSImageStorage()

    return JobService(
            repo=repo,
            task_queue=task_queue,
            image_storage=image_storage,
        )