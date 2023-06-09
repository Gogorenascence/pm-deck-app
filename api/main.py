from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import card_types, extra_effects, reactions, card_tags, cards, decks, accounts
from routers.authenticator import authenticator
import os


app = FastAPI()


origins = [
    "http://localhost:3000",
    os.environ.get("REACT_APP_FASTAPI_SERVICE_API_HOST", None),
    os.environ.get("CORS_HOST", None),
    os.environ.get("PUBLIC_URL", None),
]

app.include_router(card_types.router, tags=["card_types"])
app.include_router(extra_effects.router, tags=["extra_effects"])
app.include_router(reactions.router, tags=["reactions"])
app.include_router(card_tags.router, tags=["card_tags"])
app.include_router(cards.router, tags=["cards"])
app.include_router(decks.router, tags=["decks"])
app.include_router(accounts.router, tags=["accounts"])
app.include_router(authenticator.router, tags=["authenticator"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
