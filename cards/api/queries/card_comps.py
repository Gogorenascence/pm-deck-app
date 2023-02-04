from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool

class CardTypeIn(BaseModel):
    name: str
    rules: Optional[str]
    deck_type: str

class CardTypeOut(CardTypeIn):
    id: int

class ExtraEffectIn(BaseModel):
    name: str
    rules: Optional[str]

class ExtraEffectOut(ExtraEffectIn):
    id: int

class ReactionIn(BaseModel):
    name: str
    rules: Optional[str]

class ReactionOut(ReactionIn):
    id: int

class TagIn(BaseModel):
    name: str
    rules: Optional[str]

class TagOut(TagIn):
    id: int

# class CardIn(BaseModel):
#     name: str
#     card_class: str
#     hero_name: str
#     hero_id: str
#     series_name: str
#     card_number: int
#     effect_text: Optional[str]
#     flavor_text: Optional[str]
#     illustrator: Optional[str]
#     picture_url: Optional[str]
#     file_name: str

# class CardOut(CardIn):
#     id: int
