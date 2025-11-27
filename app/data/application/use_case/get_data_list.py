from typing import List

from app.data.application.port.data_repository_port import DataRepositoryPort
from app.data.domain.data import Data


class GetDataList:
    def __init__(self, data_repository: DataRepositoryPort):
        self.data_repository = data_repository

    def execute(self, limit: int) -> List[Data]:
        return self.data_repository.get_recent(limit)

