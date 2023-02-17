from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import card_comps
# from authenticator import authenticator
import os


app = FastAPI()


origins = [
    "http://localhost:3000",
    os.environ.get("REACT_APP_FASTAPI_SERVICE_API_HOST", None),
    os.environ.get("CORS_HOST", None),
    os.environ.get("PUBLIC_URL", None),
]

app.include_router(card_comps.router, tags=["card_comps"])
# app.include_router(reviews.router, tags=["reviews"])
# app.include_router(authenticator.router, tags=["authenticator"])
# app.include_router(spotify.router, tags=["spotify"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
