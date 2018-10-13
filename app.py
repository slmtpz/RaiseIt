from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from services import auth, posting
import json


app = Flask(__name__)
CORS(app)

# todo: deposit endpoint


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)
    # TODO: GSM
    # todo: get_messages field ?

    response = auth.register_user(username, password)
    return jsonify(response)


@app.route('/login', methods=['POST'])
def login():
    # todo: tokenization
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)

    response = auth.get_user(username, password)
    return jsonify(response)


@app.route('/posting', methods=['GET', 'POST'])
def posting_ops():
    if request.method == 'GET':
        pass
    else:
        # todo: check username-password is in db
        username = request.headers.get('username')

        room = request.form.get('room', type=int)
        saloon = request.form.get('saloon', type=int)
        address = request.form.get('address', type=int)
        building_type = request.form.get('building_type', type=str)
        post_type = request.form.get('post_type', type=str)
        starting_bid = request.form.get('starting_bid', type=int)
        size = request.form.get('size', type=int)
        floor = request.form.get('floor', type=int)
        age = request.form.get('age', type=int)
        expiration_time = request.form.get('expiration_time', type=int)

        posting.add_posting(username, room, saloon, address, building_type, post_type, starting_bid, size,
                            floor, age, expiration_time)


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
