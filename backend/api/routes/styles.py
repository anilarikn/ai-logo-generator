from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from core.dependencies import get_styles_service
from core import errors
from services.styles_service import StylesService
from domain.style import Style
from models.schemas import StyleResponse

router = APIRouter(prefix="/styles", tags=["styles"])


def _to_response(style: Style) -> StyleResponse:
    return StyleResponse(
        id=style.id,
        label=style.label,
        slug=style.slug,
        image_url=style.image_url,
        order=style.order,
        active=style.active,
        created_at=style.created_at,
    )


@router.get("/", response_model=List[StyleResponse], status_code=status.HTTP_200_OK)
def list_active_styles(service: StylesService = Depends(get_styles_service)):
    try:
        styles = service.list_active_styles()
        return [_to_response(s) for s in styles]
    except errors.StylePersistenceError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Temporary error while fetching styles",
        )
