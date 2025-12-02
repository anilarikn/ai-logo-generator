import os

class Settings:
    project_name: str = "AI Image Generation Simulator API"

    gcp_project_id: str = os.getenv("GCP_PROJECT_ID")
    firestore_collection: str = os.getenv("FIRESTORE_COLLECTION", "image_jobs")


settings = Settings()