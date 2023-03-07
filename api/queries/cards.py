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

    def remove_card_type(self, id: str, card_type_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        card_type = props["card_type"]
        if card_type_id in card_type:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$pull": {"card_type": card_type_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)


    def add_extra_effect(self, id: str, extra_effect_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        extra_effects = props["extra_effects"]
        if extra_effect_id not in extra_effects:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"extra_effects": extra_effect_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)

    def remove_extra_effect(self, id: str, extra_effect_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        extra_effects = props["extra_effects"]
        if extra_effect_id in extra_effects:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"extra_effects": extra_effect_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)


    def add_reaction(self, id: str, reaction_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$push": {"reactions": reaction_id}},
            return_document=ReturnDocument.AFTER,
        )
        return CardOut(**props, id=id)

    def remove_reaction(self, id: str, reaction_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        reactions = props["reactions"]
        if reaction_id in reactions:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$pull": {"reactions": reaction_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)


    def add_tag(self, id: str, tag_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        card_tags = props["card_tags"]
        if tag_id not in card_tags:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"card_tags": tag_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)


    def remove_tag(self, id: str, tag_id: str) -> CardOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        card_tags = props["card_tags"]
        if tag_id in card_tags:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$pull": {"card_tags": tag_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)
