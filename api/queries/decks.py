from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.decks import (
    DeckIn,
    Deck,
    DeckOut,
    DecksAll
)
from models.cards import CardOut
import os


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
        props["views"] = 0
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



    def add_card(self, id: str, card_number: int) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        cards = props["cards"]
        if cards.count(card_number) < 2:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"cards": card_number}},
                return_document=ReturnDocument.AFTER,
            )
        return DeckOut(**props, id=id)

    def remove_card(self, id: str, card_number: int) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        cards = props["cards"]
        if card_number in cards:
            cards.remove(card_number)
        props["cards"] = cards
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return DeckOut(**props, id=id)

    def clear_deck(self, id: str) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        props["cards"] = []
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return DeckOut(**props, id=id)

    def get_cover_image(self, id: str) -> str:
        props = self.collection.find_one({"_id": ObjectId(id)})
        cards = props["cards"]
        if len(cards) > 0:
            first = cards[0]
            DATABASE_URL = os.environ["DATABASE_URL"]
            conn = MongoClient(DATABASE_URL)
            db = conn.cards.cards
            card = db.find_one({"card_number": first})
            cover_image = card["picture_url"]
        return cover_image
