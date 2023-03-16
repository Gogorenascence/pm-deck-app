from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.cards import (
    CardIn,
    Card,
    CardOut,
    CardsAll
)
from models.card_comps import (
    CardTypeOut,
    ExtraEffectOut,
    ReactionOut,
    TagOut
)
import os


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

    def get_related_cards(self, card_number) -> CardsAll:
        card = self.collection.find_one({"card_number": card_number})
        if not card:
            return None
        hero_id = card["hero_id"]
        db = self.collection.find()
        cards = []
        for document in db:
            document["id"] = str(document["_id"])
            if (document["hero_id"] == hero_id) and (document["card_number"] != card_number):
                cards.append(CardOut(**document))
        return cards

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
        if card_type_id not in card_type:
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

    def get_card_type(self, card_number: int) -> CardTypeOut:
        props = self.collection.find_one({"card_number": card_number})
        card_type_id = props["card_type"][0]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.card_types

        card_type = db.find_one({"_id": ObjectId(card_type_id)})
        card_type["id"] = str(card_type["_id"])
        return card_type


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
                {"$pull": {"extra_effects": extra_effect_id}},
                return_document=ReturnDocument.AFTER,
            )
        return CardOut(**props, id=id)

    def get_extra_effects(self, card_number: int) -> list:
        props = self.collection.find_one({"card_number": card_number})
        extra_effect_ids = props["extra_effects"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.extra_effects

        extra_effects = []
        for extra_effect_id in extra_effect_ids:
            extra_effect = db.find_one({"_id": ObjectId(extra_effect_id)})
            extra_effect["id"] = str(extra_effect["_id"])
            extra_effects.append(ExtraEffectOut(**extra_effect))
        return extra_effects


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
            reactions.remove(reaction_id)
        props["reactions"] = reactions
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return CardOut(**props, id=id)

    def get_reactions(self, card_number: int) -> list:
        props = self.collection.find_one({"card_number": card_number})
        reaction_ids = props["reactions"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.reactions

        reactions = []
        reaction_counts = {}
        for reaction_id in reaction_ids:
            if reaction_id not in reaction_counts.keys():
                reaction_counts[reaction_id] = 1
            else:
                reaction_counts[reaction_id] += 1
        for a,b in reaction_counts.items():
            reaction = db.find_one({"_id": ObjectId(a)})
            reaction["id"] = str(reaction["_id"])
            reaction["count"] = b
            reactions.append(ReactionOut(**reaction))
        return reactions


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

    def get_tags(self, card_number: int) -> list:
        props = self.collection.find_one({"card_number": card_number})
        card_tag_ids = props["card_tags"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.card_tags

        card_tags = []
        for card_tag_id in card_tag_ids:
            card_tag = db.find_one({"_id": ObjectId(card_tag_id)})
            card_tag["id"] = str(card_tag["_id"])
            card_tags.append(TagOut(**card_tag))
        return card_tags
