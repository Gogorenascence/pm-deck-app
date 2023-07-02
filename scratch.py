# import datetime

# then = "2022-06-26T16:23:23.488Z"

# # Convert the string to a datetime object
# then_datetime = datetime.datetime.fromisoformat(then[:-1])

# # Get the current time
# time_now = datetime.datetime.utcnow()

# # Compare the two datetime objects
# ago = time_now - then_datetime

# days = ago.days
# years, days = divmod(days, 365.25)
# months, days = divmod(days, 30.44)
# hours, remainder = divmod(ago.seconds, 3600)
# minutes, seconds = divmod(remainder, 60)

# # Print the time difference
# if years > 0:
#     print(f"{int(years)} year{'s' if int(years) > 1 else ''}, {int(months)} month{'s' if int(months) > 1 else ''} ago")
# elif months > 0:
#     print(f"{int(months)} month{'s' if int(months) > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
# elif days > 0:
#     print(f"{days} day{'s' if days > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
# elif hours > 0:
#     print(f"{hours} hour{'s' if hours > 1 else ''}, {minutes} minutes, and {seconds} seconds ago")
# elif minutes > 0:
#     print(f"{minutes} minute{'s' if minutes > 1 else ''} and {seconds} seconds ago")
# else:
#     print(f"{seconds} seconds ago")

# # import datetime
# # # from bson.objectid import ObjectId

# # # def get_times(self, id) -> dict:
# # time_ago = {}
# #     # props = self.collection.find_one({"_id": ObjectId(id)})

# # created = "2023-06-25T18:16:38.644000"
# # created_datetime = datetime.datetime.fromisoformat(created[:-1])

# # updated = "2023-06-2T18:16:38.644000"
# # updated_datetime = datetime.datetime.fromisoformat(updated[:-1])

# # time_now = datetime.datetime.utcnow()

# # created_ago = time_now - created_datetime

# # days_created = created_ago.days
# # years_created, days_created = divmod(days_created, 365.25)
# # months_created, days_created = divmod(days_created, 30.44)
# # hours_created, remainder_created = divmod(created_ago.seconds, 3600)
# # minutes_created, seconds_created = divmod(remainder_created, 60)

# # if years_created > 0:
# #     time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
# # elif months_created > 0:
# #     time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
# # elif days_created > 0:
# #     time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
# # elif hours_created > 0:
# #     time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
# # elif minutes_created > 0:
# #     time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
# # else:
# #     time_ago["created"] = "A few seconds ago"

# # updated_ago = time_now - updated_datetime

# # days_updated = updated_ago.days
# # years_updated, days_updated = divmod(days_updated, 365.25)
# # months_updated, days_updated = divmod(days_updated, 30.44)
# # hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
# # minutes_updated, seconds_updated = divmod(remainder_updated, 60)

# # if years_updated > 0:
# #     time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
# # elif months_updated > 0:
# #     time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
# # elif days_updated > 0:
# #     time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
# # elif hours_updated > 0:
# #     time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
# # elif minutes_updated > 0:
# #     time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
# # else:
# #     time_ago["updated"] = "A few seconds ago"

# # return time_ago


# import datetime


# def get_times(created, updated):
#     time_ago = {}

#     created_datetime = datetime.datetime.fromisoformat(created)
#     updated_datetime = datetime.datetime.fromisoformat(updated)
#     time_now = datetime.datetime.utcnow()

#     created_ago = time_now - created_datetime
#     days_created = created_ago.days
#     years_created, days_created = divmod(days_created, 365.25)
#     months_created, days_created = divmod(days_created, 30.44)
#     hours_created, remainder_created = divmod(created_ago.seconds, 3600)
#     minutes_created, seconds_created = divmod(remainder_created, 60)

#     if years_created > 0:
#         time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
#     elif months_created > 0:
#         time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
#     elif days_created > 0:
#         time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
#     elif hours_created > 0:
#         time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
#     elif minutes_created > 0:
#         time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
#     else:
#         time_ago["created"] = "A few seconds ago"

#     updated_ago = time_now - updated_datetime
#     days_updated = updated_ago.days
#     years_updated, days_updated = divmod(days_updated, 365.25)
#     months_updated, days_updated = divmod(days_updated, 30.44)
#     hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
#     minutes_updated, seconds_updated = divmod(remainder_updated, 60)

#     if years_updated > 0:
#         time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
#     elif months_updated > 0:
#         time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
#     elif days_updated > 0:
#         time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
#     elif hours_updated > 0:
#         time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
#     elif minutes_updated > 0:
#         time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
#     else:
#         time_ago["updated"] = "A few seconds ago"

#     return time_ago

# created = "2023-06-25T18:16:38.644000"
# updated = "2023-06-2T18:16:38.644000"
# result = get_times(created, updated)
# print(result)


#     def get_all_full_decks(self) -> list:
#         db = self.collection.find()
#         decks = []
#         for deck in db:
#             deck["id"] = str(deck["_id"])
#             deck.pop("_id")
#             card_list = deck["cards"]
#             pluck_list = deck["pluck"]

#             DATABASE_URL = os.environ["DATABASE_URL"]
#             conn = MongoClient(DATABASE_URL)
#             db = conn.cards.cards

#             main_deck = []
#             for card_item in card_list:
#                 card = db.find_one({"card_number": card_item})
#                 card["id"] = str(card["_id"])
#                 card.pop("_id")
#                 main_deck.append(card)
#             pluck_deck = []

#             for pluck_item in pluck_list:
#                 pluck = db.find_one({"card_number": pluck_item})
#                 pluck["id"] = str(pluck["_id"])
#                 pluck.pop("_id")
#                 pluck_deck.append(pluck)
#             deck["full_card_list"] = main_deck
#             deck["full_pluck_list"] = pluck_deck
#             decks.append(deck)
#         return decks
# docker compose yaml

# volumes:
#   cards:
#     external: true
# services:
#   api:
#     build:
#       context: ./api
#       dockerfile: Dockerfile.dev
#     environment:
#       CORS_HOST: http://localhost:3000
#       DATABASE_URL: mongodb://root:password@mongo
#       DATABASE_NAME: cards
#       WAIT_HOSTS: mongo:27017
#       WAIT_BEFORE: 5
#       WAIT_TIMEOUT: 60
#       SIGNING_KEY: 80f21f5e48acbc32a55hj26pabafb2d4d57f5be921a487484d014147bfd96115d7ddbe8f26219rsds227b343d7f4b9p00p9dd1249e1ec892baf73572353666a97e
#     ports:
#       - "8000:8000"
#     volumes:
#       - ./api:/app
#   mongo:
#     image: mongo:6
#     volumes:
#         - ./setup/mongodb:/docker-entrypoint-initdb.d
#         - cards:/data/db
#     environment:
#         MONGO_INITDB_ROOT_USERNAME: root
#         MONGO_INITDB_ROOT_PASSWORD: password
#     ports:
#       - 27017:27017
#   ghi:
#     image: node:lts-bullseye
#     command: /bin/bash run.sh
#     working_dir: /app
#     volumes:
#       - ./ghi:/app
#     ports:
#       - "3000:3000"
#     environment:
#       HOST_OS: ${OS}
#       NODE_ENV: development
#       HOST: "0.0.0.0"
#       PUBLIC_URL: http://localhost:3000
#       REACT_APP_FASTAPI_SERVICE_API_HOST: http://localhost:8000

# dockerfile.python

# FROM python:3.10-bullseye
# RUN python -m pip install --upgrade pip
# WORKDIR /app

# # Copy the top-level files in your service's directory
# # Modify these instructions to do that
# COPY requirements.txt requirements.txt
# COPY authenticator.py authenticator.py
# COPY main.py main.py

# # Copy all of the subdirectories in your service's directory
# # Modify these instructions to do that
# COPY queries queries
# COPY routers routers
# COPY models models

# RUN python -m pip install -r requirements.txt

# # !! PORT env var needs to match with exposed port in caprover dashboard
# CMD uvicorn main:app --host 0.0.0.0 --port 80

# # If you're using a relational database and want migrations
# # to be run automatically, delete the previous CMD line and
# # uncomment the following COPY and CMD lines
# # COPY migrations migrations
# # # !! PORT env var needs to match with exposed port in caprover dashboard
# # CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80

# dockerfile.mongo

# FROM mongo:latest

# # Copy the JSON file into the container
# COPY data/card_tags.json data/card_tags.json
# COPY data/card_types.json data/card_types.json
# COPY data/cards.json data/cards.json
# COPY data/decks.json data/decks.json
# COPY data/extra_effects.json data/extra_effects.json
# COPY data/reactions.json data/reactions.json

# # Install MongoDB client tools
# RUN apt-get update && \
#     apt-get install -y mongodb-clients && \
#     rm -rf /var/lib/apt/lists/*

# # Load the data into the MongoDB database
# CMD mongoimport --host mongodb --db cards --collection card_tags --file /data/card_tags.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection card_types --file /data/card_types.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection cards --file /data/cards.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection decks --file /data/decks.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection extra_effects --file /data/extra_effects.json --jsonArray && \
#     mongoimport --host mongodb --db cards --collection reactions --file /data/reactions.json --jsonArray
