from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Style:
    id: str
    label: str
    slug: str
    image_url: Optional[str]
    order: int
    active: bool
    created_at: Optional[datetime] = None
