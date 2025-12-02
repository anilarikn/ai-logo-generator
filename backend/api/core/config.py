import os

class Settings:
    project_name: str = "AI Image Generation Simulator API"


    firestore_collection: str = os.getenv("FIRESTORE_COLLECTION", "image_jobs")


settings = Settings()