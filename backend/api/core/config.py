import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)


class Settings:
    project_name: str = "AI Image Generation Simulator API"

    base_api_url: str = os.getenv("BASE_API_URL", "http://localhost:8000")
    task_internal_path: str = "/jobs/internal/{job_id}/process"

    gcp_project_id: str = os.getenv("GCP_PROJECT_ID")
    firestore_collection: str = os.getenv("FIRESTORE_COLLECTION")

    styles_collection: str = os.getenv("STYLES_COLLECTION")

    gcp_location: str = os.getenv("GCP_LOCATION", "europe-west1")
    tasks_queue: str = os.getenv("TASKS_QUEUE")

    gcs_bucket: str = os.getenv("GCS_BUCKET")
    gcs_base_logo_blob: str = os.getenv("GCS_BASE_LOGO_BLOB", "default-base-image.jpg")

    job_delay_min: int = int(os.getenv("JOB_DELAY_SECONDS", "30"))
    job_delay_max: int = int(os.getenv("JOB_DELAY_SECONDS", "60"))


    def __init__(self) -> None:
        if not self.gcp_project_id:
            raise ValueError("GCP_PROJECT_ID must be set (check your .env)")
        if not self.gcs_bucket:
            raise ValueError("GCS_BUCKET must be set (check your .env)")


settings = Settings()
