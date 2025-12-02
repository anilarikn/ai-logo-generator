from fastapi import APIRouter, Depends, HTTPException, status

from core.dependencies import get_job_service
from core import errors
from domain.job import Job
from models.schemas import GenerateRequest, JobResponse
from services.jobs_service import JobService

router = APIRouter(prefix="/jobs", tags=["jobs"])


def _to_response(job: Job) -> JobResponse:
    return JobResponse(
        job_id=job.id,
        prompt=job.prompt,
        style=job.style,
        status=job.status,
        image_url=job.image_url,
    )


@router.post("/generate", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def generate_logo(
    req: GenerateRequest,
    service: JobService = Depends(get_job_service),
):
    try:
        job = service.create_job(req)
        return _to_response(job)
    except errors.JobPersistenceError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Temporary error while creating job"
        )


@router.get("/{job_id}", response_model=JobResponse)
def get_job(
    job_id: str,
    service: JobService = Depends(get_job_service),
):
    try:
        job = service.get_job(job_id)
        return _to_response(job)
    except errors.JobNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    except errors.JobPersistenceError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Temporary error while fetching job"
        )
