import json
import bcrypt
import secrets
from pymongo import MongoClient
from bson import json_util
from flask import Flask, request, redirect, Response ,jsonify


app = Flask(__name__)


@app.get("/")
def getData():
    return json.dumps({"message": "Hello World!"})


@app.post("/signup")
def signup():
    username = request.data.get('username')
    if not username:
        return json.dumps({"error": "username is required"})
    # alreadyExists = User.objects.filter(username=username).first()
    alreadyExists = False
    if alreadyExists:
        return json.dumps({"error": "username already exists"})
    password = request.data.get('password')
    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    # user = User(username=username, password_hash=pw_hash)
    # user.save()
    return json.dumps({"message": "success"})


@app.post("/login")
def login():
    username = request.data.get('username')
    if not username:
        return json.dumps({"error": "username is required"})
    password = request.data.get('password')
    # user = User.objects.filter(username=username).first()
    user = True
    pw_hash = ""
    if not user:
        return json.dumps({"error": "username or password is incorrect"})
    if not bcrypt.checkpw(password.encode(), pw_hash.encode()):
        return json.dumps({"error": "username or password is incorrect"})
    user_token = secrets.token_urlsafe(64)
    user.user_token = user_token
    return json.dumps({"message": "success", "token": user_token})

@app.get("/users")
def users():
    client = MongoClient("mongodb+srv://guppii:guppii@guppii.6uahsyp.mongodb.net/")
    db = client['guppii']
    users = db['users']
    user_info = list(users.find())
    resp = json.loads(json_util.dumps(user_info))
    return resp

@app.post("/user/")




def main():
    app.run(host="0.0.0.0", port=8080, debug=True)

main()