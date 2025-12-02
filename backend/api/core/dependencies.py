from functools import lru_cache

from infrastructure.job_repository import FirebaseJobRepository
from services.jobs_service import JobService


@lru_cache
def get_job_service() -> JobService:
    repo = FirebaseJobRepository()
    return JobService(repo)
