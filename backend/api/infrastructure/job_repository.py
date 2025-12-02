from abc import ABC, abstractmethod
from datetime import datetime, timezone
from typing import Dict, Any

from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError

from core.config import settings
from core import constants, errors
from domain.job import Job


class JobRepository(ABC):
    @abstractmethod
    def create_job(self, prompt: str, style: str) -> str:
        ...

    @abstractmethod
    def get_job(self, job_id: str) -> Job:
        ...

    @abstractmethod
    def update_job(self, job_id: str, update_data: Dict[str, Any]) -> Job:
        ...


class FirebaseJobRepository(JobRepository):
    def __init__(self) -> None:
        self._client = firestore.Client(project=settings.gcp_project_id)
        self._collection = self._client.collection(settings.firestore_collection)

    def create_job(self, prompt: str, style: str) -> str:
        now = datetime.now(timezone.utc)

        data = {
            constants.FIELD_PROMPT: prompt,
            constants.FIELD_STYLE: style,
            constants.FIELD_STATUS: constants.STATUS_QUEUED,
            constants.FIELD_IMAGE_URL: None,
            constants.FIELD_CREATED_AT: now,
            constants.FIELD_UPDATED_AT: now,
        }

        try:
            doc_ref = self._collection.document()
            doc_ref.set(data)
            return doc_ref.id
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to create job in Firestore") from exc

    def get_job(self, job_id: str) -> Job:
        try:
            doc_ref = self._collection.document(job_id)
            snap = doc_ref.get()
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to read job from Firestore") from exc

        if not snap.exists:
            raise errors.JobNotFoundError(f"Job {job_id} not found")

        data = snap.to_dict() or {}
        return self._to_domain(job_id, data)

    def update_job(self, job_id: str, update_data: Dict[str, Any]) -> Job:
        try:
            doc_ref = self._collection.document(job_id)
            snap = doc_ref.get()
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to read job for update") from exc

        if not snap.exists:
            raise errors.JobNotFoundError(f"Job {job_id} not found")

        existing_data = snap.to_dict() or {}
        now_utc = datetime.now(timezone.utc)

        update_payload = {
            **update_data,
            constants.FIELD_UPDATED_AT: now_utc,
        }

        try:
            doc_ref.update(update_payload)
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to update job in Firestore") from exc

        final_data = {
            **existing_data,
            **update_payload,
        }

        return self._to_domain(job_id, final_data)

    def _to_domain(self, job_id: str, data: Dict[str, Any]) -> Job:
        return Job(
            id=job_id,
            prompt=data[constants.FIELD_PROMPT],
            style=data[constants.FIELD_STYLE],
            status=data[constants.FIELD_STATUS],
            image_url=data.get(constants.FIELD_IMAGE_URL),
            created_at=data[constants.FIELD_CREATED_AT],
            updated_at=data[constants.FIELD_UPDATED_AT],
        )
