from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

class GenerateRequest(BaseModel):
    prompt: str
    style: str

class JobResponse(BaseModel):
    job_id: str
    prompt: str
    style: str
    status: str
    image_url: Optional[str] = None

class StyleResponse(BaseModel):
    id: str
    label: str
    slug: str
    image_url: Optional[HttpUrl | str] = None
    order: int
    active: bool
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True
