from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
# from queries.card_comps import CardTypeOut,

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
    card_type_id: int
    extra_effects: List
    reactions: List
    card_tags: List

class CardOut(CardIn):
    id: int
