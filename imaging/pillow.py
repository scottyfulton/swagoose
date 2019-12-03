from io import BytesIO
import base64
from PIL import Image
import sys

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

# decode from base64 for retrieval from DB
with open("decodedImg.png", "wb") as fh:
    fh.write(base64.decodebytes(encoded))
