from models.decks import (
    DeckIn,
    DeckOut,
    DecksAll
    )

from queries.decks import DeckQueries
from fastapi import APIRouter, Depends, Response
# from authenticator import authenticator

router = APIRouter(tags=["decks"])


@router.get("/api/decks/", response_model=DecksAll)
async def get_all_decks(queries: DeckQueries = Depends()):
    return DecksAll(decks=queries.get_all_decks())

@router.get("/api/decks/{deck_id}", response_model=DeckOut)
async def get_deck(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.get_deck(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.post("/api/decks/", response_model=DeckOut)
async def create_deck(
    deck_in: DeckIn,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.create_deck(deck_in)
    return deck

@router.put("/api/decks/{deck_id}", response_model=DeckOut | str)
async def update_deck(
    deck_id: str,
    deck_in: DeckIn,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.update_deck(deck_id, deck_in)
    if deck is None:
        response.status_code = 404
    else:
        return deck

@router.delete("/api/decks/{deck_id}", response_model=bool | str)
async def delete_deck(
    deck_id: str,
    response: Response,
    queries: DeckQueries = Depends(),
):
    deck = queries.delete_deck(deck_id)
    if deck is None:
        response.status_code = 404
    else:
        return True
