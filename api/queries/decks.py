from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.decks import (
    DeckIn,
    Deck,
    DeckOut,
    DecksAll
)
# from models.card_comps import CardTypeOut, ExtraEffectOut


class DeckQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "decks"

    def get_all_decks(self) -> DecksAll:
        db = self.collection.find()
        decks = []
        for document in db:
            document["id"] = str(document["_id"])
            decks.append(DeckOut(**document))
        return decks

    def get_deck(self, id) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return DeckOut(**props)

    def create_deck(self, deck: DeckIn) -> Deck:
        props = deck.dict()
        props["cards"] = []
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Deck(**props)

    def update_deck(self, id: str, deck: DeckIn) -> DeckOut:
        props = deck.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return DeckOut(**props, id=id)

    def delete_deck(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
