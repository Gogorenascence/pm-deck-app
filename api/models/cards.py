from pydantic import BaseModel
from typing import List, Optional
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


class CardIn(BaseModel):
    name: str
    card_class: str
    hero_name: str
    hero_id: str
    series_name: str
    card_number: int
    effect_text: Optional[str]
    flavor_text: Optional[str]
    illustrator: Optional[str]
    picture_url: Optional[str]
    file_name: str
    card_type_id: str
    extra_effects: List
    reactions: List
    card_tags: List


class Card(CardIn):
    id: PydanticObjectId


class CardOut(CardIn):
    id: str


class CardsAll(BaseModel):
    cards: List[CardOut]
