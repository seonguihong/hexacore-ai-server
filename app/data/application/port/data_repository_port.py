from abc import ABC, abstractmethod
from typing import List

from app.data.domain.data import Data


class DataRepositoryPort(ABC):
    @abstractmethod
    def get_recent(self, limit: int) -> List[Data]:
        """
        최신 데이터를 키워드와 함께 조회
        """
        raise NotImplementedError

    @abstractmethod
    def save(self, data: Data) -> Data:
        """
        데이터를 저장하고 저장된 데이터를 반환
        """
        raise NotImplementedError