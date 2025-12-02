from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Job:
    id: str
    prompt: str
    style: str
    status: str
    image_url: Optional[str]
    created_at: datetime
    updated_at: datetime