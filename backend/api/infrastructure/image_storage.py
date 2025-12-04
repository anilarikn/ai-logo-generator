from abc import ABC, abstractmethod
from typing import Final

from google.cloud import storage
from google.api_core.exceptions import GoogleAPIError

from core.config import settings
from core import errors


class ImageStorage(ABC):
    @abstractmethod
    def create_placeholder_logo(self, job_id: str) -> str:
        ...


class GCSImageStorage(ImageStorage):
    def __init__(self) -> None:
        self._client = storage.Client(project=settings.gcp_project_id)
        self._bucket = self._client.bucket(settings.gcs_bucket)
        self._base_blob_name: Final[str] = settings.gcs_base_logo_blob

    def create_placeholder_logo(self, job_id: str) -> str:
        source_blob = self._bucket.blob(self._base_blob_name)

        target_blob_name = f"jobs/{job_id}.png"
        target_blob = self._bucket.blob(target_blob_name)

        try:
            source_blob.reload()

            target_blob = self._bucket.copy_blob(
                source_blob,
                self._bucket,
                new_name=target_blob_name,
            )
        except GoogleAPIError as exc:
            raise errors.JobPersistenceError(
                "Failed to create logo object in GCS"
            ) from exc

        return target_blob.public_url
