from pymongo import MongoClient
from bson.objectid import ObjectId
client = MongoClient("mongodb+srv://quinn:<insert-password>@cluster0.wqwjw.mongodb.net/?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE")
db = client.my_first_database

db.inventory.insert_many([
    {"item": "test"},
    {"item": "test2"}])

# The web framework gets post_id from the URL and passes it as a string
def get(post_id):
    # Convert from string to ObjectId:
    document = client.my_first_database.inventory.find_one({'_id': ObjectId(post_id)})
    print(document)

get("61720760d6a25f66c2176509")