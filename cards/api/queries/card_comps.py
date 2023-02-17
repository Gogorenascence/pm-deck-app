from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models.card_comps import (
    CardTypeIn,
    CardTypeOut,
    CardTypesAll,
    # ExtraEffectIn,
    # ExtraEffectOut,
    # ExtraEffectsAll,
    # ReactionIn,
    # ReactionOut,
    # ReactionsAll,
    # TagIn,
    # TagOut,
    # TagsAll
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

    def create_card_type(self, card_type: CardTypeIn) -> CardTypeOut:
        props = card_type.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CardTypeOut(**props)


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



# class ExtraEffectQueries(Queries):
#     def get_all_extra_effects(self) -> ExtraEffectsAll:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM extra_effects
#                     """
#                 )

#                 results = []
#                 for row in cur.fetchall():
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                     results.append(record)

#                 return results

#     def get_extra_effect(self, id) -> ExtraEffectOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM extra_effects
#                     WHERE id = %s
#                     """,
#                     [id],
#                 )
#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def create_extra_effect(self, extra_effect: ExtraEffectIn) -> ExtraEffectOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     extra_effect.name,
#                     extra_effect.rules,
#                 ]
#                 cur.execute(
#                     """
#                     INSERT INTO extra_effects (name, rules)
#                     VALUES (%s, %s)
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def update_card_type(self, extra_effect_id, extra_effect: ExtraEffectIn) -> ExtraEffectOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     extra_effect.name,
#                     extra_effect.rules,
#                     extra_effect_id,
#                 ]
#                 cur.execute(
#                     """
#                     UPDATE extra_effects
#                     SET name = %s
#                         , rules = %s
#                     WHERE id = %s
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def delete_extra_effect(self, extra_effect_id: int) -> bool:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM extra_effects
#                     WHERE id = %s
#                     """,
#                     [extra_effect_id],
#                 )



# class ReactionQueries(Queries):
#     def get_all_reactions(self) -> ReactionsAll:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM reactions
#                     """
#                 )

#                 results = []
#                 for row in cur.fetchall():
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                     results.append(record)

#                 return results

#     def get_reaction(self, id) -> ReactionOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM reactions
#                     WHERE id = %s
#                     """,
#                     [id],
#                 )
#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def create_reaction(self, reaction: ReactionIn) -> ReactionOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     reaction.name,
#                     reaction.rules,
#                 ]
#                 cur.execute(
#                     """
#                     INSERT INTO reactions (name, rules)
#                     VALUES (%s, %s)
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def update_reaction(self, reaction_id, reaction: ReactionIn) -> ReactionOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     reaction.name,
#                     reaction.rules,
#                     reaction_id,
#                 ]
#                 cur.execute(
#                     """
#                     UPDATE reactions
#                     SET name = %s
#                         , rules = %s
#                     WHERE id = %s
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def delete_reaction(self, reaction_id: int) -> bool:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM reactions
#                     WHERE id = %s
#                     """,
#                     [reaction_id],
#                 )



# class TagQueries(Queries):
#     def get_all_tags(self) -> TagsAll:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM tags
#                     """
#                 )

#                 results = []
#                 for row in cur.fetchall():
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]
#                     results.append(record)

#                 return results

#     def get_tag(self, id) -> TagOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT * FROM tags
#                     WHERE id = %s
#                     """,
#                     [id],
#                 )
#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def create_tag(self, card_tag: TagIn) -> TagOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     card_tag.name,
#                     card_tag.rules,
#                 ]
#                 cur.execute(
#                     """
#                     INSERT INTO tags (name, rules)
#                     VALUES (%s, %s)
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def update_tag(self, tag_id, card_tag: TagIn) -> TagOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 params = [
#                     card_tag.name,
#                     card_tag.rules,
#                     tag_id,
#                 ]
#                 cur.execute(
#                     """
#                     UPDATE tags
#                     SET name = %s
#                         , rules = %s
#                     WHERE id = %s
#                     RETURNING id, name, rules
#                     """,
#                     params,
#                 )

#                 record = None
#                 row = cur.fetchone()
#                 if row is not None:
#                     record = {}
#                     for i, column in enumerate(cur.description):
#                         record[column.name] = row[i]

#                 return record

#     def delete_tag(self, tag_id: int) -> bool:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM tags
#                     WHERE id = %s
#                     """,
#                     [tag_id],
#                 )
