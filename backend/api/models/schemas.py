from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    prompt: str
    style: str

class JobResponse(BaseModel):
    job_id: str
    prompt: str
    style: str
    status: str
    image_url: Optional[str] = None
