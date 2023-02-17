from models.card_comps import (
    CardTypeIn,
    CardTypeOut,
    CardTypesAll,
    # ExtraEffectQueries,
    # ExtraEffectIn,
    # ExtraEffectOut,
    # ExtraEffectsAll,
    # ReactionQueries,
    # ReactionIn,
    # ReactionOut,
    # ReactionsAll,
    # TagQueries,
    # TagIn,
    # TagOut,
    # TagsAll
    )
from queries.card_comps import CardTypeQueries
from fastapi import APIRouter, Depends, Response
# from authenticator import authenticator

router = APIRouter(tags=["card_comps"])


@router.get("/api/card_types/", response_model=CardTypesAll)
async def get_all_card_types(queries: CardTypeQueries = Depends()):
    return CardTypesAll(card_types=queries.get_all_card_types())

@router.get("/api/card_types/{card_type_id}", response_model=CardTypeOut)
async def get_card_type(
    card_type_id: str,
    response: Response,
    queries: CardTypeQueries = Depends(),
):
    card_type = queries.get_card_type(card_type_id)
    if card_type is None:
        response.status_code = 404
    else:
        return card_type

@router.post("/api/card_types/", response_model=CardTypeOut)
async def create_card_type(
    card_type_in: CardTypeIn,
    queries: CardTypeQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    card_type = queries.create_card_type(card_type_in)
    return card_type

@router.put("/api/card_types/{card_type_id}", response_model=CardTypeOut | str)
async def update_card_type(
    card_type_id: str,
    card_type_in: CardTypeIn,
    response: Response,
    queries: CardTypeQueries = Depends(),
):
    card_type = queries.update_card_type(card_type_id, card_type_in)
    if card_type is None:
        response.status_code = 404
    else:
        return card_type

@router.delete("/api/card_types/{card_type_id}", response_model=bool | str)
async def delete_card_type(
    card_type_id: str,
    response: Response,
    queries: CardTypeQueries = Depends(),
):
    card_type = queries.delete_card_type(card_type_id)
    if card_type is None:
        response.status_code = 404
    else:
        return True


# @router.get("/api/extra_effects/", response_model=ExtraEffectsAll)
# def get_all_extra_effects(queries: ExtraEffectQueries = Depends()):
#     return {
#         "extra_effects": queries.get_all_extra_effects(),
#     }

# @router.get("/api/extra_effects/{extra_effect_id}", response_model=ExtraEffectOut)
# def get_extra_effect(
#     extra_effect_id: int,
#     response: Response,
#     queries: ExtraEffectQueries = Depends(),
# ):
#     record = queries.get_extra_effect(extra_effect_id)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.post("/api/extra_effects/", response_model=ExtraEffectOut)
# def create_extra_effect(
#     extra_effect_in: ExtraEffectIn,
#     queries: ExtraEffectQueries = Depends(),
#     # account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return queries.create_extra_effect(extra_effect_in)

# @router.put("/api/extra_effects/{extra_effect_id}", response_model=ExtraEffectOut | str)
# def update_extra_effect(
#     extra_effect_id: int,
#     extra_effect_in: ExtraEffectIn,
#     response: Response,
#     queries: ExtraEffectQueries = Depends(),
# ):
#     record = queries.update_extra_effect(extra_effect_id, extra_effect_in)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.delete("/api/extra_effects/{extra_effect_id}", response_model=bool | str)
# def delete_extra_effect(
#     extra_effect_id: int,
#     queries: ExtraEffectQueries = Depends(),
# ):
#     queries.delete_extra_effect(extra_effect_id)
#     return True


# @router.get("/api/reactions/", response_model=ReactionsAll)
# def get_all_reactions(queries: ReactionQueries = Depends()):
#     return {
#         "reactions": queries.get_all_reactions(),
#     }

# @router.get("/api/reactions/{reaction_id}", response_model=ReactionOut)
# def get_reaction(
#     reaction_id: int,
#     response: Response,
#     queries: ReactionQueries = Depends(),
# ):
#     record = queries.get_reaction(reaction_id)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.post("/api/reactions/", response_model=ReactionOut)
# def create_reaction(
#     reaction_in: ReactionIn,
#     queries: ReactionQueries = Depends(),
#     # account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return queries.create_reaction(reaction_in)

# @router.put("/api/reactions/{reaction_id}", response_model=ReactionOut | str)
# def update_reaction(
#     reaction_id: int,
#     reaction_in: ReactionIn,
#     response: Response,
#     queries: ReactionQueries = Depends(),
# ):
#     record = queries.update_reaction(reaction_id, reaction_in)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.delete("/api/reactions/{reaction_id}", response_model=bool | str)
# def delete_reaction(
#     reaction_id: int,
#     queries: ReactionQueries = Depends(),
# ):
#     queries.delete_reaction(reaction_id)
#     return True


# @router.get("/api/tags/", response_model=TagsAll)
# def get_all_tags(queries: TagQueries = Depends()):
#     return {
#         "card_tags": queries.get_all_tags(),
#     }

# @router.get("/api/tags/{tag_id}", response_model=TagOut)
# def get_tag(
#     tag_id: int,
#     response: Response,
#     queries: TagQueries = Depends(),
# ):
#     record = queries.get_tag(tag_id)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.post("/api/tags/", response_model=TagOut)
# def create_tag(
#     tag_in: TagIn,
#     queries: TagQueries = Depends(),
#     # account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return queries.create_tag(tag_in)

# @router.put("/api/tags/{tag_id}", response_model=TagOut | str)
# def update_tag(
#     tag_id: int,
#     tag_in: TagIn,
#     response: Response,
#     queries: TagQueries = Depends(),
# ):
#     record = queries.update_tag(tag_id, tag_in)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record

# @router.delete("/api/tags/{tag_id}", response_model=bool | str)
# def delete_tag(
#     tag_id: int,
#     queries: TagQueries = Depends(),
# ):
#     queries.delete_tag(tag_id)
#     return True
