import datetime

then = "2022-06-26T16:23:23.488Z"

# Convert the string to a datetime object
then_datetime = datetime.datetime.fromisoformat(then[:-1])

# Get the current time
time_now = datetime.datetime.utcnow()

# Compare the two datetime objects
ago = time_now - then_datetime

days = ago.days
years, days = divmod(days, 365.25)
months, days = divmod(days, 30.44)
hours, remainder = divmod(ago.seconds, 3600)
minutes, seconds = divmod(remainder, 60)

# Print the time difference
if years > 0:
    print(f"{int(years)} year{'s' if int(years) > 1 else ''}, {int(months)} month{'s' if int(months) > 1 else ''} ago")
elif months > 0:
    print(f"{int(months)} month{'s' if int(months) > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
elif days > 0:
    print(f"{days} day{'s' if days > 1 else ''}, {hours} hours, {minutes} minutes, and {seconds} seconds ago")
elif hours > 0:
    print(f"{hours} hour{'s' if hours > 1 else ''}, {minutes} minutes, and {seconds} seconds ago")
elif minutes > 0:
    print(f"{minutes} minute{'s' if minutes > 1 else ''} and {seconds} seconds ago")
else:
    print(f"{seconds} seconds ago")

# import datetime
# # from bson.objectid import ObjectId

# # def get_times(self, id) -> dict:
# time_ago = {}
#     # props = self.collection.find_one({"_id": ObjectId(id)})

# created = "2023-06-25T18:16:38.644000"
# created_datetime = datetime.datetime.fromisoformat(created[:-1])

# updated = "2023-06-2T18:16:38.644000"
# updated_datetime = datetime.datetime.fromisoformat(updated[:-1])

# time_now = datetime.datetime.utcnow()

# created_ago = time_now - created_datetime

# days_created = created_ago.days
# years_created, days_created = divmod(days_created, 365.25)
# months_created, days_created = divmod(days_created, 30.44)
# hours_created, remainder_created = divmod(created_ago.seconds, 3600)
# minutes_created, seconds_created = divmod(remainder_created, 60)

# if years_created > 0:
#     time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
# elif months_created > 0:
#     time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
# elif days_created > 0:
#     time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
# elif hours_created > 0:
#     time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
# elif minutes_created > 0:
#     time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
# else:
#     time_ago["created"] = "A few seconds ago"

# updated_ago = time_now - updated_datetime

# days_updated = updated_ago.days
# years_updated, days_updated = divmod(days_updated, 365.25)
# months_updated, days_updated = divmod(days_updated, 30.44)
# hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
# minutes_updated, seconds_updated = divmod(remainder_updated, 60)

# if years_updated > 0:
#     time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
# elif months_updated > 0:
#     time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
# elif days_updated > 0:
#     time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
# elif hours_updated > 0:
#     time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
# elif minutes_updated > 0:
#     time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
# else:
#     time_ago["updated"] = "A few seconds ago"

# return time_ago


import datetime


def get_times(created, updated):
    time_ago = {}

    created_datetime = datetime.datetime.fromisoformat(created)
    updated_datetime = datetime.datetime.fromisoformat(updated)
    time_now = datetime.datetime.utcnow()

    created_ago = time_now - created_datetime
    days_created = created_ago.days
    years_created, days_created = divmod(days_created, 365.25)
    months_created, days_created = divmod(days_created, 30.44)
    hours_created, remainder_created = divmod(created_ago.seconds, 3600)
    minutes_created, seconds_created = divmod(remainder_created, 60)

    if years_created > 0:
        time_ago["created"] = f"{int(years_created)} year{'s' if int(years_created) > 1 else ''} ago"
    elif months_created > 0:
        time_ago["created"] = f"{int(months_created)} month{'s' if int(months_created) > 1 else ''} ago"
    elif days_created > 0:
        time_ago["created"] = f"{days_created} day{'s' if days_created > 1 else ''} and {hours_created} hours ago"
    elif hours_created > 0:
        time_ago["created"] = f"{hours_created} hour{'s' if hours_created > 1 else ''} and {minutes_created} minutes ago"
    elif minutes_created > 0:
        time_ago["created"] = f"{minutes_created} minute{'s' if minutes_created > 1 else ''} ago"
    else:
        time_ago["created"] = "A few seconds ago"

    updated_ago = time_now - updated_datetime
    days_updated = updated_ago.days
    years_updated, days_updated = divmod(days_updated, 365.25)
    months_updated, days_updated = divmod(days_updated, 30.44)
    hours_updated, remainder_updated = divmod(updated_ago.seconds, 3600)
    minutes_updated, seconds_updated = divmod(remainder_updated, 60)

    if years_updated > 0:
        time_ago["updated"] = f"{int(years_updated)} year{'s' if int(years_updated) > 1 else ''} ago"
    elif months_updated > 0:
        time_ago["updated"] = f"{int(months_updated)} month{'s' if int(months_updated) > 1 else ''} ago"
    elif days_updated > 0:
        time_ago["updated"] = f"{days_updated} day{'s' if days_updated > 1 else ''} and {hours_updated} hours ago"
    elif hours_updated > 0:
        time_ago["updated"] = f"{hours_updated} hour{'s' if hours_updated > 1 else ''} and {minutes_updated} minutes ago"
    elif minutes_updated > 0:
        time_ago["updated"] = f"{minutes_updated} minute{'s' if minutes_updated > 1 else ''} ago"
    else:
        time_ago["updated"] = "A few seconds ago"

    return time_ago

created = "2023-06-25T18:16:38.644000"
updated = "2023-06-2T18:16:38.644000"
result = get_times(created, updated)
print(result)
