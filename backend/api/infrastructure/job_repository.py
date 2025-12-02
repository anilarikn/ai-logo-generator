from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
from datetime import datetime, timezone

from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError

from core.config import settings
from core import errors, constants


class JobRepository(ABC):
    @abstractmethod
    def create_job(self, prompt: str, style: str, webhook_url: Optional[str] = None) -> str:
        ...

    @abstractmethod
    def get_job(self, job_id: str) -> Dict[str, Any]:
        ...

    @abstractmethod
    def update_job(self, job_id: str, update_data: Dict[str, Any]) -> None:
        ...


class FirebaseJobRepository(JobRepository):
    def __init__(self) -> None:
        self._client = firestore.Client(project=settings.gcp_project_id)
        self._collection = self._client.collection(settings.firestore_collection)

    def create_job(self, prompt: str, style: str, webhook_url: Optional[str] = None) -> str:
        now = datetime.now(timezone.utc)

        data = {
            constants.FIELD_PROMPT: prompt,
            constants.FIELD_STYLE: style,
            constants.FIELD_STATUS: constants.STATUS_QUEUED,
            constants.FIELD_IMAGE_URL: None,
            constants.FIELD_WEBHOOK_URL: webhook_url,
            constants.FIELD_CREATED_AT: now,
            constants.FIELD_UPDATED_AT: now,
        }

        try:
            doc_ref = self._collection.document()
            doc_ref.set(data)
            return doc_ref.id
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to create job in Firestore") from exc

    def get_job(self, job_id: str) -> Dict[str, Any]:
        try:
            doc_ref = self._collection.document(job_id)
            snap = doc_ref.get()
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to read job from Firestore") from exc

        if not snap.exists:
            raise errors.JobNotFoundError(f"Job {job_id} not found")

        data = snap.to_dict() or {}
        data["id"] = snap.id
        return data

    def update_job(self, job_id: str, update_data: Dict[str, Any]) -> None:
        try:
            doc_ref = self._collection.document(job_id)
            snap = doc_ref.get()
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to read job for update") from exc

        if not snap.exists:
            raise errors.JobNotFoundError(f"Job {job_id} not found")

        update_data[constants.FIELD_UPDATED_AT] = datetime.now(timezone.utc)

        try:
            doc_ref.update(update_data)
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError("Failed to update job in Firestore") from exc
