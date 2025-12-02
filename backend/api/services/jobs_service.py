from typing import Optional

from infrastructure.job_repository import JobRepository
from models.schemas import GenerateRequest, JobResponse
from core import constants


class JobService:
    def __init__(self, repo: JobRepository) -> None:
        self._repo = repo

    def create_job(self, req: GenerateRequest) -> JobResponse:
        job_id = self._repo.create_job(
            prompt=req.prompt,
            style=req.style,
            webhook_url=req.webhook_url,
        )
        data = self._repo.get_job(job_id)

        return self._map_to_response(job_id, data)

    def get_job(self, job_id: str) -> JobResponse:
        data = self._repo.get_job(job_id)
        return self._map_to_response(job_id, data)

    def _map_to_response(self, job_id: str, data: dict) -> JobResponse:
        return JobResponse(
            job_id=job_id,
            prompt=data[constants.FIELD_PROMPT],
            style=data[constants.FIELD_STYLE],
            status=data[constants.FIELD_STATUS],
            image_url=data.get(constants.FIELD_IMAGE_URL),
            has_webhook=bool(data.get(constants.FIELD_WEBHOOK_URL)),
        )
