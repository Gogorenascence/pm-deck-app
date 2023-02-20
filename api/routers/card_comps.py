from models.card_comps import (
    CardTypeIn,
    CardTypeOut,
    CardTypesAll,
    ExtraEffectIn,
    ExtraEffectOut,
    ExtraEffectsAll,
    ReactionIn,
    ReactionOut,
    ReactionsAll,
    TagIn,
    TagOut,
    TagsAll
    )
from queries.card_comps import CardTypeQueries, ExtraEffectQueries, ReactionQueries, TagQueries
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


@router.get("/api/extra_effects/", response_model=ExtraEffectsAll)
async def get_all_extra_effects(queries: ExtraEffectQueries = Depends()):
    return ExtraEffectsAll(extra_effects=queries.get_all_extra_effects())

@router.get("/api/extra_effects/{extra_effect_id}", response_model=ExtraEffectOut)
async def get_extra_effect(
    extra_effect_id: str,
    response: Response,
    queries: ExtraEffectQueries = Depends(),
):
    extra_effect = queries.get_extra_effect(extra_effect_id)
    if extra_effect is None:
        response.status_code = 404
    else:
        return extra_effect

@router.post("/api/extra_effects/", response_model=ExtraEffectOut)
async def create_extra_effect(
    extra_effect_in: ExtraEffectIn,
    queries: ExtraEffectQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    extra_effect = queries.create_extra_effect(extra_effect_in)
    return extra_effect

@router.put("/api/extra_effect/{extra_effect_id}", response_model=ExtraEffectOut | str)
async def update_extra_effect(
    extra_effect_id: str,
    extra_effect_in: ExtraEffectIn,
    response: Response,
    queries: ExtraEffectQueries = Depends(),
):
    extra_effect = queries.update_extra_effect(extra_effect_id, extra_effect_in)
    if extra_effect is None:
        response.status_code = 404
    else:
        return extra_effect

@router.delete("/api/extra_effects/{extra_effect_id}", response_model=bool | str)
async def delete_extra_effect(
    extra_effect_id: str,
    response: Response,
    queries: ExtraEffectQueries = Depends(),
):
    extra_effect = queries.delete_extra_effect(extra_effect_id)
    if extra_effect is None:
        response.status_code = 404
    else:
        return True


@router.get("/api/reactions/", response_model=ReactionsAll)
async def get_all_reactions(queries: ReactionQueries = Depends()):
    return ReactionsAll(reactions=queries.get_all_reactions())

@router.get("/api/reactions/{reaction_id}", response_model=ReactionOut)
async def get_reaction(
    reaction_id: str,
    response: Response,
    queries: ReactionQueries = Depends(),
):
    reaction = queries.get_reaction(reaction_id)
    if reaction is None:
        response.status_code = 404
    else:
        return reaction

@router.post("/api/reactions/", response_model=ReactionIn)
async def create_reaction(
    reaction_in: ReactionIn,
    queries: ReactionQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    reaction = queries.create_reaction(reaction_in)
    return reaction

@router.put("/api/reaction/{reaction_id}", response_model=ReactionOut | str)
async def update_reaction(
    reaction_id: str,
    reaction_in: ReactionIn,
    response: Response,
    queries: ReactionQueries = Depends(),
):
    reaction = queries.update_reaction(reaction_id, reaction_in)
    if reaction is None:
        response.status_code = 404
    else:
        return reaction

@router.delete("/api/reactions/{reaction_id}", response_model=bool | str)
async def delete_reaction(
    reaction_id: str,
    response: Response,
    queries: ReactionQueries = Depends(),
):
    reaction = queries.delete_reaction(reaction_id)
    if reaction is None:
        response.status_code = 404
    else:
        return True


@router.get("/api/tags/", response_model=TagsAll)
async def get_all_tags(queries: TagQueries = Depends()):
    return TagsAll(card_tags=queries.get_all_tags())

@router.get("/api/tag/{tag_id}", response_model=TagOut)
async def get_tag(
    tag_id: str,
    response: Response,
    queries: TagQueries = Depends(),
):
    card_tag = queries.get_tag(tag_id)
    if card_tag is None:
        response.status_code = 404
    else:
        return card_tag

@router.post("/api/tags/", response_model=TagOut)
async def create_tag(
    tag_in: TagIn,
    queries: TagQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    card_tag = queries.create_tag(tag_in)
    return card_tag

@router.put("/api/tag/{tag_id}", response_model=TagOut | str)
async def update_tag(
    tag_id: str,
    tag_in: TagIn,
    response: Response,
    queries: TagQueries = Depends(),
):
    card_tag = queries.update_tag(tag_id, tag_in)
    if card_tag is None:
        response.status_code = 404
    else:
        return card_tag

@router.delete("/api/tag/{tag_id}", response_model=bool | str)
async def delete_tag(
    tag_id: str,
    response: Response,
    queries: TagQueries = Depends(),
):
    card_tag = queries.delete_tag(tag_id)
    if card_tag is None:
        response.status_code = 404
    else:
        return True
