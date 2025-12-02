from fastapi import APIRouter, Depends, HTTPException, status

from core.dependencies import get_job_service
from core import errors
from models.schemas import GenerateRequest, JobResponse
from services.jobs_service import JobService

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/generate", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def generate_logo(
    req: GenerateRequest,
    service: JobService = Depends(get_job_service),
):
    try:
        return service.create_job(req)
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
        return service.get_job(job_id)
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
