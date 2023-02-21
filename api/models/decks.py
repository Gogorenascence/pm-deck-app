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


class DeckIn(BaseModel):
    name: str
    account_id: str
    description: str
    cards: List


class Deck(DeckIn):
    id: PydanticObjectId


class DeckOut(DeckIn):
    id: str


class DecksAll(BaseModel):
    decks: List
