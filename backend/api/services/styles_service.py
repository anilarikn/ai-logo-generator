from typing import List

from domain.style import Style
from infrastructure.style_repository import StyleRepository


class StylesService:
    def __init__(self, repo: StyleRepository) -> None:
        self._repo = repo

    def list_active_styles(self) -> List[Style]:
        return self._repo.list_active_styles()
