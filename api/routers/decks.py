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

@router.put("/decks/{deck_id}/add/{card_number}", response_model=DeckOut)
async def add_card(
    deck_id: str,
    card_number: int,
    response: Response,
    queries: DeckQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    deck = queries.add_card(deck_id, card_number)
    if deck is None:
        response.status_code = 404
    else:
        return deck


# @router.put("/decks/{deck_id}/add/{card_number}", response_model=DeckOut)
# async def add_card_to_deck(
#     deck_id: str,
#     card_number: int,
#     repo: DeckQueries = Depends(),
#     # account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     url = f"process.env.REACT_APP_SAMPLE_SERVICE_API_HOST/api/cards/{card_number}"
#     response = requests.get(url)
#     content = json.loads(response.content)

#     card_dict = {
#         "name": content.get("name"),
#         "multiverse_id": content.get("multiverse_ids")[0],
#         "mana": content.get('mana_cost'),
#         "card_type": content.get("type_line"),
#         "cmc": content.get("cmc"),
#         "formats": [
#             legality
#             for legality in content.get("legalities")
#             if content.get("legalities")[legality] == "legal"
#         ],
#     }

#     if content.get("layout") in [
#         "modal_dfc",
#         "transform",
#     ]:
#         card_dict["picture_url"] = (
#             content.get("card_faces")[0].get("image_uris").get("normal")
#         )
#         card_dict["mana"] = content.get("card_faces")[0].get("mana_cost")
#     else:
#         card_dict["picture_url"] = content.get("image_uris").get("normal")
#         card_dict["mana"] = content.get("mana_cost")

#     deck = repo.add_card_to_deck(card=card_dict, deck_id=deck_id)

#     return deck
