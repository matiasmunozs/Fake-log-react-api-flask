"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
#importe OS
import os
#instale $ pipenv install flask-jwt-extended
#importe esto desde flask JWT:
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)




# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

    
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=    access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    
    dictionary = {
        "message":"Hello World"
    }
  
  
    return jsonify(dictionary)

#aqui para registrar al usuario:

# @api.route('/user/signup', methods=['POST'])
# def user_signup():
    
#     body = request.get_json()
#     print(body)
#     new_user=User(email=body["email"], password=body["password"], is_active=True)
#     db.session.add(new_user)
#     db.session.commit()
    
#     response= jsonify(new_user.serialize())


#     print(response.get_data())
#     return response,201


@api.route("/signup", methods=["POST"])
def sign_up():
   email = request.json.get("email",None)
   password = request.json.get("password", None)
   is_active = request.json.get("is_active", None)
       
   user = User(email = email, password = password, is_active = is_active)
   json= request.get_json()

   db.session.add(user)
   db.session.commit()
       
   return jsonify([]), 200

@api.route('/user/login', methods=['POST'])
def user_login():
    body = request.get_json(force=True)
    print(body)
    user=db.session.query(User).filter(User.email==body["email"])[0]
    if user.password == body["password"]:
        access_token = create_access_token(identity = user.id)
        response = jsonify(access_token)
        return response,200
    else:
        return jsonify("Error user dont exist"),401


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_token=get_jwt_identity()
    print(user_token)
    user=User.query.get(user_token)
    response = jsonify(user.serialize())

    return response, 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)