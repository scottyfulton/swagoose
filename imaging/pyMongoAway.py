import pymongo
from pymongo import MongoClient
import os

# connection = os.environ.get(MONGO_CONNECTION)
# connection = os.getenv(MONGO_CONNECTION)
# print(os.environ[MONGO_CONNECTION])
print(os.environ[MONGO_CONNECTION])

# client = MongoClient()

# client = MongoClient('mongodb://localhost:27017')
# db = client['pymongo_test']

# posts = db.posts
# post_data = {
#     'title': 'Python and MongoDB',
#     'content': 'PyMongo is fun, you guys',
#     'author': 'Scott'
# }
# result = posts.insert_one(post_data)
# print('One post: {0}'.format(result.inserted_id))
