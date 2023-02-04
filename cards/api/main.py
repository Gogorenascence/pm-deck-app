from fastapi import FastAPI


app = FastAPI()

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from routers import accounts, reviews, spotify
# from authenticator import authenticator
# import os

# app = FastAPI()

# origins = [
#     "http://localhost:3000",
#     "https://team-drop-and-give-me-20.gitlab.io/module3-project-gamma/",
#     os.environ.get("REACT_APP_SAMPLE_SERVICE_API_HOST", None),
#     os.environ.get("CORS_HOST", None),
#     os.environ.get("PUBLIC_URL", None),
# ]

# app.include_router(accounts.router, tags=["accounts"])
# app.include_router(reviews.router, tags=["reviews"])
# app.include_router(authenticator.router, tags=["authenticator"])
# app.include_router(spotify.router, tags=["spotify"])
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
