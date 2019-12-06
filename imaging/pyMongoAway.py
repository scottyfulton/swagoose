import pymongo
from pymongo import MongoClient
import os
import sys

from pprint import pprint

MONGO_CONN = "mongodb+srv://scotty:5%25Percent0@cluster0-z2vnf.mongodb.net/test?retryWrites=true&w=majority"
# connection = os.environ.get("MONGOCONN")
# print(connection)

# connection = os.environ.get(MONGO_CONNECTION)
# connection = os.getenv(MONGO_CONNECTION)
# print(os.environ[MONGO_CONNECTION])
# print(os.environ)


client = MongoClient(MONGO_CONN)
db = client['postsTest']

# serverStatusResult = db.command("serverStatus")
# pprint(serverStatusResult)

base = sys.argv[1]
print(base)

# posts = db.posts
# post_data = {
#     'title': 'Python and MongoDB',
#     'content': 'PyMongo is fun, you guys',
#     'description': 'Scott',
#     'imageBase64': }
# result = posts.insert_one(post_data)
# print('One post: {0}'.format(result.inserted_id))
