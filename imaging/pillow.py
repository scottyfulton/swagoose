from io import BytesIO
import base64
from PIL import Image
import sys

# for mongo
# import pymongo
# from pymongo import MongoClient
# MONGO_CONN = "mongodb+srv://scotty:5%25Percent0@cluster0-z2vnf.mongodb.net/test?retryWrites=true&w=majority"
# client = MongoClient(MONGO_CONN)
# db = client['postsTest']
# companyName = (sys.argv[2])7

# argv[1] is first arg passed cmdline
img = Image.open((sys.argv[1]))
img = img.convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    if item[0] == 255 and item[1] == 255 and item[2] == 255:
        newData.append((255, 255, 255, 0))
    else:
        if item[0] > 150:
            newData.append((0, 0, 0, 255))
        else:
            newData.append(item)

img.putdata(newData)
img.save('transparent.png', "PNG")

# encode to base 64 for DB injection
encoded = base64.b64encode(open('transparent.png', "rb").read())
with open("encodedTxt.txt", "wb") as fh:
    fh.write(encoded)

# decode from base64 for retrieval from DB
# with open("decodedImg.png", "wb") as fh:
#     fh.write(base64.decodebytes(encoded))

# posts to DB
# posts = db.posts
# post_data = {
#     'companyName': companyName,
#     'imageBase64': encoded}
# result = posts.insert_one(post_data)
# print('One post: {0}'.format(result.inserted_id))
