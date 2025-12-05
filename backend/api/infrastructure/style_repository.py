from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime

from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError
from google.cloud.firestore_v1 import FieldFilter

from core.config import settings
from core import constants, errors
from domain.style import Style


class StyleRepository(ABC):
    @abstractmethod
    def list_active_styles(self) -> List[Style]:
        ...


class FirestoreStyleRepository(StyleRepository):
    def __init__(self) -> None:
        self._client = firestore.Client(project=settings.gcp_project_id)
        self._collection = self._client.collection(settings.styles_collection)

    def list_active_styles(self) -> List[Style]:
        try:
            query = (
                self._collection
                .where(
                    filter=FieldFilter(
                        constants.FIELD_STYLE_ACTIVE,
                        "==",
                        True,
                    )
                )
                .order_by(constants.FIELD_STYLE_ORDER)
            )
            docs = list(query.stream())
        except GoogleAPIError as exc:
            raise errors.StylePersistenceError(
                "Failed to fetch styles from Firestore"
            ) from exc

        styles: List[Style] = []
        for doc in docs:
            data = doc.to_dict() or {}
            styles.append(self._to_domain(doc.id, data))

        return styles

    def _to_domain(self, style_id: str, data: Dict[str, Any]) -> Style:
        return Style(
            id=style_id,
            label=data.get(constants.FIELD_STYLE_LABEL, ""),
            slug=data.get(constants.FIELD_STYLE_SLUG, ""),
            image_url=data.get(constants.FIELD_STYLE_IMAGE_URL),
            order=int(data.get(constants.FIELD_STYLE_ORDER, 0)),
            active=bool(data.get(constants.FIELD_STYLE_ACTIVE, False)),
            created_at=self._extract_datetime(
                data.get(constants.FIELD_STYLE_CREATED_AT)
            ),
        )

    @staticmethod
    def _extract_datetime(raw: Any) -> Optional[datetime]:
        if raw is None:
            return None
        if isinstance(raw, datetime):
            return raw
        to_dt = getattr(raw, "to_datetime", None)
        if callable(to_dt):
            return to_dt()
        return None
