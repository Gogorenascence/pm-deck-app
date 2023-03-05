from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.card_comps import (
    CardTypeIn,
    CardType,
    CardTypeOut,
    CardTypesAll,
    ExtraEffectIn,
    ExtraEffect,
    ExtraEffectOut,
    ExtraEffectsAll,
    ReactionIn,
    Reaction,
    ReactionOut,
    ReactionsAll,
    TagIn,
    CardTag,
    TagOut,
    TagsAll
)


class CardTypeQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "card_comps"

    def get_all_card_types(self) -> CardTypesAll:
        db = self.collection.find()
        card_types = []
        for document in db:
            document["id"] = str(document["_id"])
            card_types.append(CardTypeOut(**document))
        return card_types

    def get_card_type(self, id) -> CardTypeOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return CardTypeOut(**props)

    def create_card_type(self, card_type: CardTypeIn) -> CardType:
        props = card_type.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CardType(**props)

    def update_card_type(self, id: str, card_type: CardTypeIn) -> CardTypeOut:
        props = card_type.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return CardTypeOut(**props, id=id)

    def delete_card_type(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})


class ExtraEffectQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "card_comps"

    def get_all_extra_effects(self) -> ExtraEffectsAll:
        db = self.collection.find()
        extra_effects = []
        for document in db:
            document["id"] = str(document["_id"])
            extra_effects.append(ExtraEffectOut(**document))
        return extra_effects

    def get_extra_effect(self, id) -> ExtraEffectOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return ExtraEffectOut(**props)

    def create_extra_effect(self, extra_effect: ExtraEffectIn) -> ExtraEffect:
        props = extra_effect.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return ExtraEffect(**props)

    def update_extra_effect(self, id: str, extra_effect: ExtraEffectIn) -> ExtraEffectOut:
        props = extra_effect.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return ExtraEffectOut(**props, id=id)

    def delete_extra_effect(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})


class ReactionQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "card_comps"

    def get_all_reactions(self) -> ReactionsAll:
        db = self.collection.find()
        reactions = []
        for document in db:
            document["id"] = str(document["_id"])
            reactions.append(ReactionOut(**document))
        return reactions

    def get_reaction(self, id) -> ReactionOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return ReactionOut(**props)

    def create_reaction(self, reaction: ReactionIn) -> Reaction:
        props = reaction.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Reaction(**props)

    def update_reaction(self, id: str, reaction: ReactionIn) -> ReactionOut:
        props = reaction.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return ReactionOut(**props, id=id)

    def delete_reaction(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})


class TagQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "card_comps"

    def get_all_tags(self) -> TagsAll:
        db = self.collection.find()
        card_tags = []
        for document in db:
            document["id"] = str(document["_id"])
            card_tags.append(TagOut(**document))
        return card_tags

    def get_tag(self, id) -> TagOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return TagOut(**props)

    def create_tag(self, card_tag: TagIn) -> CardTag:
        props = card_tag.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CardTag(**props)

    def update_tag(self, id: str, card_tag: TagIn) -> TagOut:
        props = card_tag.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return TagOut(**props, id=id)

    def delete_tag(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
