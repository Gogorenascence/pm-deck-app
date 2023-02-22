from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.decks import (
    DeckIn,
    Deck,
    DeckOut,
    DecksAll
)
from models.cards import CardOut
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

    def add_card_to_deck(self, deck_id: str, card: dict ) -> DeckOut:
        deck = self.collection.find_one({"_id": ObjectId(deck_id)})
        card_list = props.get("cards")

        in_deck = False
        for card_item in card_list:
            if (card_item.get("card_number") == card.get("card_number")
            and card_item["quantity"] == 1):
                card_item["quantity"] += 1
                in_deck = True

        if not in_deck:
            card["quantity"] = 1
            card_list.append(card)

        deck["cards"] = card_list

        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": deck},
            return_document=ReturnDocument.AFTER,
        )
        deck["account_id"] = str(deck["account_id"])
        return DeckOut(**deck)

    def delete_deck(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
