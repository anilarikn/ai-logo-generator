from domain.job import Job
from infrastructure.job_repository import JobRepository
from infrastructure.tasks_queue import TaskQueue
from infrastructure.image_storage import ImageStorage
from models.schemas import GenerateRequest
from core import constants

import random


class JobService:

    def __init__(
        self,
        repo: JobRepository,
        task_queue: TaskQueue,
        image_storage: ImageStorage,
    ) -> None:
        self._repo = repo
        self._task_queue = task_queue
        self._image_storage = image_storage

    def create_job(self, req: GenerateRequest) -> Job:
        job_id = self._repo.create_job(
            prompt=req.prompt,
            style=req.style,
        )

        job = self._repo.get_job(job_id)

        self._task_queue.enqueue_logo_generation(job_id)

        return job

    def get_job(self, job_id: str) -> Job:
        return self._repo.get_job(job_id)

    def process_job(self, job_id: str) -> Job:

        random_chance = random.random()
        
        if random_chance < constants.FAILURE_RATE:
            updated = self._repo.update_job(
                job_id,
                {
                    constants.FIELD_STATUS: constants.STATUS_FAILED,
                },
            )
            return updated

        image_url = self._image_storage.create_placeholder_logo(job_id)

        updated = self._repo.update_job(
            job_id,
            {
                constants.FIELD_STATUS: constants.STATUS_COMPLETED,
                constants.FIELD_IMAGE_URL: image_url,
            },
        )

        return updated
