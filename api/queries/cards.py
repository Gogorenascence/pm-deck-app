from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.cards import (
    CardIn,
    Card,
    CardOut,
    CardsAll
)


class CardTypeQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "cards"

    def get_all_cards(self) -> CardsAll:
        db = self.collection.find()
        cards = []
        for document in db:
            document["id"] = str(document["_id"])
            cards.append(CardOut(**document))
        return cards

    def get_card(self, id) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return CardOut(**props)

    def create_card(self, card: CardIn) -> Card:
        props = card.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Card(**props)

    def update_card_type(self, id: str, card: CardIn) -> CardTypeOut:
        props = card.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return CardOut(**props, id=id)

    def delete_card(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
