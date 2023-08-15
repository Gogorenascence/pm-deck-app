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
            "full_time": datetime.now(),
            "date_created": f"{int(date[5:7])}-{int(date[8:10])}-{int(date[:4])}"
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
            "full_time": datetime.now(),
            "date_updated": f"{int(date[5:7])}-{int(date[8:10])}-{int(date[:4])}"
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

    def get_booster_set_list(self, id: str) -> dict:
        booster_set = self.collection.find_one({"_id": ObjectId(id)})
        card_lists = {
            "max_variables": [],
            "normals": [],
            "rares": [],
            "super_rares": [],
            "ultra_rares": [],
        }
        mv = booster_set["mv"]
        normals = booster_set["normals"]
        rares = booster_set["rares"]
        super_rares = booster_set["super_rares"]
        ultra_rares = booster_set["ultra_rares"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        for card_item in mv:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card_lists["max_variables"].append(CardOut(**card))
        for card_item in normals:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card_lists["normals"].append(CardOut(**card))
        for card_item in rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card_lists["rares"].append(CardOut(**card))
        for card_item in super_rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card_lists["super_rares"].append(CardOut(**card))
        for card_item in ultra_rares:
            card = db.find_one({"card_number": card_item})
            card["id"] = str(card["_id"])
            card_lists["ultra_rares"].append(CardOut(**card))
        return card_lists

    def open_booster_pack(self, id: str) -> dict:
        booster_set = self.collection.find_one({"_id": ObjectId(id)})
        max_variables = booster_set["mv"]
        normals = booster_set["normals"]
        rares = booster_set["rares"]
        super_rares = booster_set["super_rares"]
        ultra_rares = booster_set["ultra_rares"]
        ratio = booster_set["ratio"]

        normal_pool = normals*8 + rares*4 + super_rares*2 + ultra_rares
        rare_pool = rares*4 + super_rares*2 + ultra_rares
        super_rare_pool = super_rares*2 + ultra_rares

        opened_pack = {
            "pull_list": [],
            "pulled_cards": []
        }
        for i in range(ratio["mv"]):
            random_idx = random.randint(0, len(max_variables) - 1)
            opened_pack["pull_list"].append(max_variables[random_idx])
        for i in range(ratio["normals"]):
            random_idx = random.randint(0, len(normal_pool) - 1)
            opened_pack["pull_list"].append(normal_pool[random_idx])
        for i in range(ratio["rares"]):
            random_idx = random.randint(0, len(rare_pool) - 1)
            opened_pack["pull_list"].append(rare_pool[random_idx])
        for i in range(ratio["supers"]):
            random_idx = random.randint(0, len(super_rare_pool) - 1)
            opened_pack["pull_list"].append(super_rare_pool[random_idx])

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
            "pulls": [],
            "full_pull_list": [],
        }
        for i in range(num):
            opened_pack = self.open_booster_pack(id)
            pull_list = opened_pack["pull_list"]
            opened_packs["full_pull_list"] += pull_list
            opened_packs["pulls"].append(opened_pack)
        return opened_packs
