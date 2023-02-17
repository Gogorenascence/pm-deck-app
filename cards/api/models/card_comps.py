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



class CardTypeIn(BaseModel):
    name: str
    deck_type: str
    rules: Optional[str]

class CardTypeOut(CardTypeIn):
    id: PydanticObjectId

class CardTypesAll(BaseModel):
    card_types: List



class ExtraEffectIn(BaseModel):
    name: str
    rules: Optional[str]

class ExtraEffectOut(ExtraEffectIn):
    id: PydanticObjectId

class ExtraEffectsAll(BaseModel):
    extra_effects: List



class ReactionIn(BaseModel):
    name: str
    rules: Optional[str]

class ReactionOut(ReactionIn):
    id: PydanticObjectId

class ReactionsAll(BaseModel):
    reactions: List



class TagIn(BaseModel):
    name: str
    rules: Optional[str]

class TagOut(TagIn):
    id: PydanticObjectId

class TagsAll(BaseModel):
    card_tags: List
