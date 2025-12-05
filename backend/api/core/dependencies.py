from functools import lru_cache

from infrastructure.job_repository import FirebaseJobRepository
from infrastructure.tasks_queue import CloudTasksQueue
from infrastructure.image_storage import GCSImageStorage
from infrastructure.style_repository import FirestoreStyleRepository
from services.styles_service import StylesService
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

@lru_cache
def get_styles_service() -> StylesService:
    repo = FirestoreStyleRepository()
    return StylesService(repo=repo)