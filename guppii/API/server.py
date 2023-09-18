import json
import bcrypt
import secrets
from pymongo import MongoClient
# from bson import json_util
from flask import Flask, request, redirect, Response ,jsonify

client = MongoClient("mongo")
DB = client['guppii']
USERS = DB['users']

app = Flask(__name__)


@app.get("/")
def getData():
    return json.dumps({"message": "Hello World!"})


@app.post("/new-user")
def new_user():
    name = request.form.get("Name")
    skills = request.form.get("Skills")
    preferences = request.form.get("Preferences")
    USERS.insert_one({"Name": name, "Skills": skills, "Preferences": preferences})
    return json.dumps({"message": "User created successfully"})


@app.get("/user/<name>")
def get_user(name):
    user = USERS.find_one({"Name": name})
    if not user:
        return json.dumps({"error": "User not found"})
    return json.dumps({"Name": user["Name"], "Skills": user["Skills"], "Preferences": user["Preferences"]})



@app.get("/users")
def users():
    user_info = list(USERS.find())
    resp = json.loads(json.dumps(user_info))
    return resp

@app.post("/user/")




def main():
    app.run(host="0.0.0.0", port=8080, debug=True)

main()