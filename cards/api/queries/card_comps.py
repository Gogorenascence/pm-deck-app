from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool

class CardTypeIn(BaseModel):
    name: str
    deck_type: str
    rules: Optional[str]

class CardTypeOut(CardTypeIn):
    id: int

class CardTypesAll(BaseModel):
    card_types: List



class ExtraEffectIn(BaseModel):
    name: str
    rules: Optional[str]

class ExtraEffectOut(ExtraEffectIn):
    id: int

class ExtraEffectsAll(BaseModel):
    extra_effects: List



class ReactionIn(BaseModel):
    name: str
    rules: Optional[str]

class ReactionOut(ReactionIn):
    id: int

class ReactionsAll(BaseModel):
    reactions: List



class TagIn(BaseModel):
    name: str
    rules: Optional[str]

class TagOut(TagIn):
    id: int

class TagsAll(BaseModel):
    card_tags: List



class CardTypeQueries:
    def get_all_card_types(self) -> CardTypesAll:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM card_types
                    """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_card_type(self, id) -> CardTypeOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM card_types
                    WHERE id = %s
                    """,
                    [id],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def create_card_type(self, card_type: CardTypeIn) -> CardTypeOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    card_type.name,
                    card_type.deck_type,
                    card_type.rules,
                ]
                cur.execute(
                    """
                    INSERT INTO card_types (name, deck_type, rules)
                    VALUES (%s, %s, %s)
                    RETURNING id, name, deck_type, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_card_type(self, card_type_id, card_type: CardTypeIn) -> CardTypeOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    card_type.name,
                    card_type.deck_type,
                    card_type.rules,
                    card_type_id,
                ]
                cur.execute(
                    """
                    UPDATE card_types
                    SET name = %s
                        , deck_type = %s
                        , rules = %s
                    WHERE id = %s
                    RETURNING id, name, deck_type, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_card_type(self, card_type_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM card_types
                    WHERE id = %s
                    """,
                    [card_type_id],
                )



class ExtraEffectQueries:
    def get_all_extra_effects(self) -> ExtraEffectsAll:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM extra_effects
                    """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_extra_effect(self, id) -> ExtraEffectOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM extra_effects
                    WHERE id = %s
                    """,
                    [id],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def create_extra_effect(self, extra_effect: ExtraEffectIn) -> ExtraEffectOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    extra_effect.name,
                    extra_effect.rules,
                ]
                cur.execute(
                    """
                    INSERT INTO extra_effects (name, rules)
                    VALUES (%s, %s)
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_card_type(self, extra_effect_id, extra_effect: ExtraEffectIn) -> ExtraEffectOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    extra_effect.name,
                    extra_effect.rules,
                    extra_effect_id,
                ]
                cur.execute(
                    """
                    UPDATE extra_effects
                    SET name = %s
                        , rules = %s
                    WHERE id = %s
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_extra_effect(self, extra_effect_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM extra_effects
                    WHERE id = %s
                    """,
                    [extra_effect_id],
                )



class ReactionQueries:
    def get_all_reactions(self) -> ReactionsAll:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM reactions
                    """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_reaction(self, id) -> ReactionOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM reactions
                    WHERE id = %s
                    """,
                    [id],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def create_reaction(self, reaction: ReactionIn) -> ReactionOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    reaction.name,
                    reaction.rules,
                ]
                cur.execute(
                    """
                    INSERT INTO reactions (name, rules)
                    VALUES (%s, %s)
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_reaction(self, reaction_id, reaction: ReactionIn) -> ReactionOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    reaction.name,
                    reaction.rules,
                    reaction_id,
                ]
                cur.execute(
                    """
                    UPDATE reactions
                    SET name = %s
                        , rules = %s
                    WHERE id = %s
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_reaction(self, reaction_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM reactions
                    WHERE id = %s
                    """,
                    [reaction_id],
                )



class TagQueries:
    def get_all_tags(self) -> TagsAll:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM tags
                    """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_tag(self, id) -> TagOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM tags
                    WHERE id = %s
                    """,
                    [id],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def create_tag(self, card_tag: TagIn) -> TagOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    card_tag.name,
                    card_tag.rules,
                ]
                cur.execute(
                    """
                    INSERT INTO tags (name, rules)
                    VALUES (%s, %s)
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_tag(self, tag_id, card_tag: TagIn) -> TagOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    card_tag.name,
                    card_tag.rules,
                    tag_id,
                ]
                cur.execute(
                    """
                    UPDATE tags
                    SET name = %s
                        , rules = %s
                    WHERE id = %s
                    RETURNING id, name, rules
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_tag(self, tag_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM tags
                    WHERE id = %s
                    """,
                    [tag_id],
                )
