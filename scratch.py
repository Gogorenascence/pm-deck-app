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
