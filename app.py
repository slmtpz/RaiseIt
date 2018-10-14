from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from services import user, posting
from utils.notifier import Messenger
from config import TWILIO

app = Flask(__name__)
CORS(app)

messenger = Messenger(TWILIO['ACCOUNT_SID'], TWILIO['AUTH_TOKEN'], TWILIO['PHONE_NUMBER'])


# todo: redis?


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)
    gsm = request.form.get('gsm', type=str)

    response = user.register_user(username, password, gsm)
    messenger.welcome_message(gsm, username)
    return jsonify(response)


@app.route('/login', methods=['POST'])
def login():
    # todo: tokenization
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)

    response = user.get_user_with_pass(username, password)
    return jsonify(response)


@app.route('/deposit', methods=['POST'])
def deposit_credits():
    username = request.form.get('username', type=str)
    amount = request.form.get('amount', type=int)

    response, user_gsm = user.deposit_credits(username, amount)
    messenger.deposit_message(user_gsm, amount)
    return jsonify(response)


@app.route('/posting', methods=['GET', 'POST'])
def posting_ops():
    if request.method == 'GET':
        postings = posting.get_all_postings()
        return jsonify({'postings': postings})
    else:
        # todo: check username-password is in db
        # TODO: recommend starting bid !!
        username = request.form.get('username')

        room = request.form.get('room', type=int)
        saloon = request.form.get('saloon', type=int)
        address = request.form.get('address', type=int)
        lat = request.form.get('lat', type=float)
        lng = request.form.get('lng', type=float)
        building_type = request.form.get('building_type', type=str)
        post_type = request.form.get('post_type', type=str)
        starting_bid = request.form.get('starting_bid', type=int)
        size = request.form.get('size', type=int)
        age = request.form.get('age', type=int)
        expiration_time = request.form.get('expiration_time', type=int)

        posting.add_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                            age, expiration_time)


@app.route('/raise', methods=['POST'])
def raise_ops():
    username = request.form.get('username', type=str)
    bid_amount = request.form.get('bid_amount', type=int)
    posting_id = request.form.get('posting_id', type=str)

    result, old_bidder_gsm = posting.raise_bid_on_posting(username, bid_amount, posting_id)
    if old_bidder_gsm:
        messenger.bid_raised_message(old_bidder_gsm)

    return jsonify(result)


if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
