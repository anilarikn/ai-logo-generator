from typing import Optional

from domain.job import Job
from infrastructure.job_repository import JobRepository
from models.schemas import GenerateRequest


class JobService:

    def __init__(self, repo: JobRepository) -> None:
        self._repo = repo

    def create_job(self, req: GenerateRequest) -> Job:
        job_id = self._repo.create_job(
            prompt=req.prompt,
            style=req.style,
        )
        return self._repo.get_job(job_id)

    def get_job(self, job_id: str) -> Job:
        return self._repo.get_job(job_id)