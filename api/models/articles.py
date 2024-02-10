from pydantic import BaseModel
from typing import Optional, List
from bson.objectid import ObjectId


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except ValueError:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class Image(BaseModel):
    src: str
    caption: Optional[str]
    link: Optional[str]
    order: int
    alt_text: str


class ArticleIn(BaseModel):
    title: str
    subtitle: str
    author: str
    created: Optional[str]
    updated: Optional[str]
    section: str
    text: str
    images: Optional[dict[str, List[Image]]]


class Article(ArticleIn):
    id: PydanticObjectId


class ArticleOut(ArticleIn):
    id: str


class ArticlesAll(BaseModel):
    articles: list
