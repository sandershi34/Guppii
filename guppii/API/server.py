import json
import bcrypt
import secrets
from flask import Flask, request, redirect


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




def main():
    app.run(host="0.0.0.0", port=8080, debug=True)

main()