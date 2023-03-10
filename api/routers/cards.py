from models.cards import (
    CardIn,
    CardOut,
    CardsAll
    )
from models.card_comps import CardTypeOut

from queries.cards import CardQueries
from fastapi import APIRouter, Depends, Response
# from authenticator import authenticator

router = APIRouter(tags=["cards"])


@router.get("/api/cards/", response_model=CardsAll)
async def get_all_cards(queries: CardQueries = Depends()):
    return CardsAll(cards=queries.get_all_cards())

@router.get("/api/cards/{card_number}/", response_model=CardOut)
async def get_card(
    card_number: int,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.get_card(card_number)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.get("/api/cards/{card_number}/related_cards/", response_model=CardsAll)
async def get_related_cards(
    card_number: int,
    queries: CardQueries = Depends(),
):
    return CardsAll(cards=queries.get_related_cards(card_number))

@router.post("/api/cards/", response_model=CardOut)
async def create_card(
    card_in: CardIn,
    queries: CardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    card = queries.create_card(card_in)
    return card

@router.put("/api/cards/{card_id}/", response_model=CardOut | str)
async def update_card(
    card_id: str,
    card_in: CardIn,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.update_card(card_id, card_in)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.delete("/api/cards/{card_id}/", response_model=bool | str)
async def delete_card(
    card_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.delete_card(card_id)
    if card is None:
        response.status_code = 404
    else:
        return True


@router.put("/api/cards/{card_id}/add_type/{card_type_id}/", response_model=CardOut | str)
async def add_card_type(
    card_id: str,
    card_type_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.add_card_type(card_id, card_type_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.put("/api/cards/{card_id}/remove_type/{card_type_id}/", response_model=CardOut | str)
async def remove_card_type(
    card_id: str,
    card_type_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.remove_card_type(card_id, card_type_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.get("/api/cards/{card_number}/get_card_type/", response_model=CardTypeOut)
async def get_card_type(
    card_number: int,
    response: Response,
    queries: CardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    card_type = queries.get_card_type(card_number)
    if card_type is None:
        response.status_code = 404
    else:
        return card_type


@router.put("/api/cards/{card_id}/add_extra/{extra_effect_id}/", response_model=CardOut | str)
async def add_extra_effect(
    card_id: str,
    extra_effect_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.add_extra_effect(card_id, extra_effect_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.put("/api/cards/{card_id}/remove_extra/{extra_effect_id}/", response_model=CardOut | str)
async def remove_extra_effect(
    card_id: str,
    extra_effect_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.remove_extra_effect(card_id, extra_effect_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.get("/api/cards/{card_number}/get_extra_effects/", response_model=list)
async def get_extra_effects(
    card_number: int,
    response: Response,
    queries: CardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    extra_effects = queries.get_extra_effects(card_number)
    if extra_effects is None:
        response.status_code = 404
    else:
        return extra_effects


@router.put("/api/cards/{card_id}/add_reaction/{reaction_id}/", response_model=CardOut | str)
async def add_reaction(
    card_id: str,
    reaction_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.add_reaction(card_id, reaction_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.put("/api/cards/{card_id}/remove_reaction/{reaction}/", response_model=CardOut | str)
async def remove_reaction(
    card_id: str,
    reaction_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.remove_reaction(card_id, reaction_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.get("/api/cards/{card_number}/get_reactions/", response_model=list)
async def get_reactions(
    card_number: int,
    response: Response,
    queries: CardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    reactions = queries.get_reactions(card_number)
    if reactions is None:
        response.status_code = 404
    else:
        return reactions


@router.put("/api/cards/{card_id}/add_tag/{tag_id}/", response_model=CardOut | str)
async def add_tag(
    card_id: str,
    tag_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.add_tag(card_id, tag_id)
    if card is None:
        response.status_code = 404
    else:
        return card


@router.put("/api/cards/{card_id}/remove_tag/{tag_id}/", response_model=CardOut | str)
async def remove_tag(
    card_id: str,
    tag_id: str,
    response: Response,
    queries: CardQueries = Depends(),
):
    card = queries.remove_tag(card_id, tag_id)
    if card is None:
        response.status_code = 404
    else:
        return card

@router.get("/api/cards/{card_number}/get_tags/", response_model=list)
async def get_tags(
    card_number: int,
    response: Response,
    queries: CardQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    card_tags = queries.get_tags(card_number)
    if card_tags is None:
        response.status_code = 404
    else:
        return card_tags
