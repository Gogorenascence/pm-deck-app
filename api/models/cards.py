from pydantic import BaseModel
from typing import List, Optional
from bson.objectid import ObjectId
from models.card_comps import CardTypeOut


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
    card_type: CardTypeOut
    extra_effects: List[str]
    reactions: List[str]
    card_tags: List[str]


class Card(CardIn):
    id: PydanticObjectId


class CardOut(CardIn):
    id: str


class CardsAll(BaseModel):
    cards: List[CardOut]
