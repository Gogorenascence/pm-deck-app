from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.booster_sets import (
    BoosterSet,
    BoosterSetIn,
    BoosterSetOut,
    BoosterSetsAll
)
from models.cards import CardOut
import os
from datetime import datetime
import random


class BoosterSetQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "booster_sets"

    def get_all_booster_sets(self) -> BoosterSetsAll:
        db = self.collection.find()
        booster_sets = []
        for document in db:
            document["id"] = str(document["_id"])
            booster_sets.append(BoosterSetOut(**document))
        return booster_sets

    def get_booster_set(self, id) -> BoosterSetOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return BoosterSetOut(**props)

    def create_booster_set(self, booster_set: BoosterSetIn) -> BoosterSet:
        props = booster_set.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now()
        }
        props["created_on"] = time_dict
        props["updated_on"] = time_dict
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return BoosterSet(**props)

    def update_booster_set(self, id: str, booster_set: BoosterSetIn) -> BoosterSetOut:
        props = booster_set.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now()
        }
        props["updated_on"] = time_dict
        date_string = props["created_on"]["full_time"]
        props["created_on"]["full_time"] = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f")
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        print((props["created_on"]["full_time"]))
        return BoosterSetOut(**props, id=id)

    def delete_booster_set(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def get_booster_set_list(self, id: str) -> list:
        booster_set = self.collection.find_one({"_id": ObjectId(id)})
        mv = booster_set["mv"]
        normals = booster_set["normals"]
        rares = booster_set["rares"]
        super_rares = booster_set["super_rares"]
        ultra_rares = booster_set["ultra_rares"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        max_variables = []
        for card_item in mv:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            max_variables.append(CardOut(**card))
        normals_cards = []
        for card_item in normals:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            normals_cards.append(CardOut(**card))
        rare_cards = []
        for card_item in rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            rare_cards.append(CardOut(**card))
        super_rare_cards = []
        for card_item in super_rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            super_rare_cards.append(CardOut(**card))
        ultra_rare_cards = []
        for card_item in ultra_rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            ultra_rare_cards.append(CardOut(**card))
        booster_set_list = [max_variables, normals_cards, rare_cards, super_rare_cards, ultra_rare_cards]
        return booster_set_list

    def open_booster_pack(self, id: str) -> dict:
        booster_set = self.collection.find_one({"_id": ObjectId(id)})
        max_variables = booster_set["mv"]
        normals = booster_set["normals"]
        rares = booster_set["rares"]
        super_rares = booster_set["super_rares"]
        ultra_rares = booster_set["ultra_rares"]
        supers = super_rares + super_rares + ultra_rares
        ratio = booster_set["ratio"]

        opened_pack = {
            "pull_list": [],
            "pulled_cards": []
        }
        for i in range(ratio["mv"]):
            random_idx = random.randint(0, len(max_variables) - 1)
            opened_pack["pull_list"].append(max_variables[random_idx])
        for i in range(ratio["normals"]):
            random_idx = random.randint(0, len(normals) - 1)
            opened_pack["pull_list"].append(normals[random_idx])
        for i in range(ratio["rares"]):
            random_idx = random.randint(0, len(rares) - 1)
            opened_pack["pull_list"].append(rares[random_idx])
        for i in range(ratio["supers"]):
            random_idx = random.randint(0, len(supers) - 1)
            opened_pack["pull_list"].append(supers[random_idx])

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        pull = []
        for card_item in opened_pack["pull_list"]:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            opened_pack["pulled_cards"].append(CardOut(**card))
        return opened_pack

    def open_booster_packs(self, id: str, num: int) -> dict:
        opened_packs = {
            "full_pull_list": [],
        }
        for i in range(num):
            opened_pack =self.open_booster_pack(id)
            pull_list = opened_pack["pull_list"]
            opened_packs["full_pull_list"] += pull_list
            opened_packs[i] = opened_pack
        return opened_packs
