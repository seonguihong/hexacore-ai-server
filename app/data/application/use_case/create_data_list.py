from typing import List

from app.data.application.port.data_repository_port import DataRepositoryPort
from app.data.domain.data import Data


class CreateDataList:
    def __init__(
        self,
        data_repository: DataRepositoryPort,
    ):
        self.data_repository = data_repository

    def execute(
        self,
        items: List[dict],
    ) -> List[Data]:
        """
        여러 데이터를 한 번에 생성
        items: [{"title": str, "content": str, "keywords": List[str]}, ...]
        """
        created_data_list: List[Data] = []

        for item in items:
            data = Data(
                title=item["title"],
                content=item["content"],
                keywords=[
                    k.strip() for k in item.get("keywords", []) if k and k.strip()
                ],
            )
            saved_data = self.data_repository.save(data)
            created_data_list.append(saved_data)

        return created_data_list

