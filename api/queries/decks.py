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
from datetime import datetime


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
        print(props)
        return DeckOut(**props)


    def create_deck(self, deck: DeckIn) -> Deck:
        props = deck.dict()
        props["views"] = 0
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now()
        }
        props["created_on"] = time_dict
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Deck(**props)


    def update_deck(self, id: str, deck: DeckIn) -> DeckOut:
        props = deck.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now()
        }
        props["updated_on"] = time_dict
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
        pluck = props["pluck"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        card = db.find_one({"card_number": card_number})
        card_type = card["card_type"][0]

        db = conn.cards.card_types
        card_type = db.find_one({"_id": ObjectId(card_type)})
        deck_type = card_type["deck_type"]


        if deck_type == "Main" and cards.count(card_number) < 2:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"cards": card_number}},
                return_document=ReturnDocument.AFTER,
            )
        elif deck_type == "Pluck" and pluck.count(card_number) < 2:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"pluck": card_number}},
                return_document=ReturnDocument.AFTER,
            )

        return DeckOut(**props, id=id)


    def remove_card(self, id: str, card_number: int) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        cards = props["cards"]
        pluck = props["pluck"]
        if card_number in cards:
            cards.remove(card_number)
        elif card_number in pluck:
            pluck.remove(card_number)
        props["cards"] = cards
        props["pluck"] = pluck
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


    def get_deck_list(self, id: str) -> list:
        deck = self.collection.find_one({"_id": ObjectId(id)})
        card_list = deck["cards"]
        pluck_list = deck["pluck"]
        side_list = deck["side"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        main_deck = []
        for card_item in card_list:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            main_deck.append(CardOut(**card))
        pluck_deck = []
        for pluck_item in pluck_list:
            pluck = db.find_one({"card_number": pluck_item})
            pluck["id"] = str(pluck["_id"])
            pluck_deck.append(CardOut(**pluck))
        side_deck = []
        for side_item in side_list:
            side = db.find_one({"card_number": side_item})
            side["id"] = str(side["_id"])
            side_deck.append(CardOut(**side))
        deck_list = [main_deck, pluck_deck, side_deck]
        return deck_list


    def get_counted_deck_list(self, id: str) -> list:
        deck = self.collection.find_one({"_id": ObjectId(id)})
        card_list = deck["cards"]
        pluck_list = deck["pluck"]
        side_list = deck["side"]

        card_count = {}
        for item in card_list:
            if item not in card_count.keys():
                card_count[item] = 1
            else:
                card_count[item] += 1

        pluck_count = {}
        for item in pluck_list:
            if item not in pluck_count.keys():
                pluck_count[item] = 1
            else:
                pluck_count[item] += 1

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        main_deck = []
        for card_item, count in card_count.items():
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card["count"] = count
            main_deck.append(CardOut(**card))
        pluck_deck = []
        for pluck_item, count in pluck_count.items():
            pluck = db.find_one({"card_number": pluck_item})
            pluck["id"] = str(pluck["_id"])
            pluck["count"] = count
            pluck_deck.append(CardOut(**pluck))
        side_deck = []
        for side_item in side_list:
            side = db.find_one({"card_number": side_item})
            side["id"] = str(side["_id"])
            side_deck.append(CardOut(**side))
        deck_list = [main_deck, pluck_deck, side_deck]
        return deck_list


    def get_popular_cards(self) -> list:
        print("cat")
        deck_count = {}
        all_cards_lists = []
        db = self.collection.find()
        for document in db:
            cards_list = list(set(document["cards"] + document["pluck"]))
            all_cards_lists += cards_list
        for card in all_cards_lists:
            if card not in deck_count.keys():
                deck_count[card] = 1
            else:
                deck_count[card] += 1

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards

        popular_cards = []
        for card_number,count in deck_count.items():
            card = db.find_one({"card_number": card_number })
            card["id"] = str(card["_id"])
            card["count"] = count
            popular_cards.append(CardOut(**card))
        print(popular_cards)
        return popular_cards


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
