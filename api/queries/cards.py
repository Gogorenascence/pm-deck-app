from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.cards import (
    CardIn,
    Card,
    CardOut,
    CardsAll
)
# from models.card_comps import CardTypeOut, ExtraEffectOut


class CardQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "cards"

    def get_all_cards(self) -> CardsAll:
        db = self.collection.find()
        cards = []
        for document in db:
            document["id"] = str(document["_id"])
            cards.append(CardOut(**document))
        return cards

    def get_card(self, card_number) -> CardOut:
        props = self.collection.find_one({"card_number": card_number})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return CardOut(**props)

    def create_card(self, card: CardIn) -> Card:
        props = card.dict()
        props["card_type"] = []
        props["extra_effects"] = []
        props["reactions"] = []
        props["card_tags"] = []
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Card(**props)

    def update_card(self, id: str, card: CardIn) -> CardOut:
        props = card.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return CardOut(**props, id=id)

    def delete_card(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def add_card_type(self, id: str, card_type_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        card_type = props["card_type"]
        if card_type_id not in card_type and len(card_type) == 0:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"card_type": card_type_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)

    # def add_extra_effect(
    #     self,
    #     card: dict,
    #     account_id: str
    # ) -> CollectionOut:
    #     collection = self.collection.find_one({
    #         "account_id": ObjectId(account_id)
    #         })
    #     card_list = collection.get("cards")

    #     found_in_collection = False
    #     for card_item in card_list:
    #         if card_item.get("multiverse_id") == card.get("multiverse_id"):
    #             card_item["quantity"] += 1
    #             found_in_collection = True

    #     if not found_in_collection:
    #         card["quantity"] = 1
    #         card_list.append(card)

    #     collection["cards"] = card_list

    #     self.collection.find_one_and_update(
    #         {"account_id": ObjectId(account_id)},
    #         {"$set": collection},
    #         return_document=ReturnDocument.AFTER,
    #     )

    #     collection["account_id"] = str(collection["account_id"])
    #     collection["id"] = str(collection["_id"])
    #     return collection

    # def remove_one_card_copy_from_collection(
    #     self, multiverse_id: int, account_id: str
    # ) -> CollectionOut:
    #     collection = self.collection.find_one({
    #         "account_id": ObjectId(account_id)
    #         })
    #     card_list = collection.get("cards")

    #     for card_item in card_list:
    #         if card_item.get("multiverse_id") == multiverse_id:
    #             card_item["quantity"] -= 1
    #             if card_item["quantity"] == 0:
    #                 card_list.remove(card_item)

    #     collection["cards"] = card_list

    #     self.collection.find_one_and_update(
    #         {"account_id": ObjectId(account_id)},
    #         {"$set": collection},
    #         return_document=ReturnDocument.AFTER,
    #     )

    #     collection["id"] = str(collection["_id"])
    #     collection["account_id"] = str(collection["account_id"])
    #     return collection

    # def remove_all_card_copies_from_collection(
    #     self, multiverse_id: int, account_id: str
    # ) -> CollectionOut:
    #     collection = self.collection.find_one({
    #         "account_id": ObjectId(account_id)
    #         })
    #     card_list = collection.get("cards")

    #     for card_item in card_list:
    #         if card_item.get("multiverse_id") == multiverse_id:
    #             card_list.remove(card_item)

    #     collection["cards"] = card_list

    #     self.collection.find_one_and_update(
    #         {"account_id": ObjectId(account_id)},
    #         {"$set": collection},
    #         return_document=ReturnDocument.AFTER,
    #     )

    #     collection["account_id"] = str(collection["account_id"])
    #     collection["id"] = str(collection["_id"])

    #     return collection
