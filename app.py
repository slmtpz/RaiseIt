from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from services import user, posting
from utils.notifier import Messenger
from config import TWILIO
from utils.area.indices import df as area_df


app = Flask(__name__)
# make the app cross origin
CORS(app)

# load Twilio messenger and make it ready to send messages
messenger = Messenger(TWILIO['ACCOUNT_SID'], TWILIO['AUTH_TOKEN'], TWILIO['PHONE_NUMBER'])


@app.route('/')
def main_page():
    """
    Renders the main page, rest is handled by React-side.
    """
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    """
    Registers user and creates a document in MongoDB.
    Also requires 'gsm' for the user to which the system sends messages.
    """
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)
    gsm = request.form.get('gsm', type=str)

    response = user.register_user(username, password, gsm)
    messenger.welcome_message(gsm, username)
    return jsonify(response)


@app.route('/login', methods=['POST'])
def login():
    """
    Checks if the users document exists in database, if so, return the document of the user.
    """
    # todo: tokenization
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)

    response = user.get_user_with_pass(username, password)
    return jsonify(response)


@app.route('/deposit', methods=['POST'])
def deposit_credits():
    """
    Updates 'credit' field in the user's document. Credits are used for bidding.
    """
    username = request.form.get('username', type=str)
    amount = request.form.get('amount', type=int)

    response, user_gsm = user.deposit_credits(username, amount)
    messenger.deposit_message(user_gsm, amount)
    return jsonify(response)


@app.route('/estimate', methods=['POST'])
def estimate_value():
    """
    Using futures of a property, an estimation algorithm predicts the value of the property.
    """
    room = request.form.get('room', type=int)
    saloon = request.form.get('saloon', type=int)
    address = request.form.get('address', type=str)
    building_type = request.form.get('building_type', type=str)
    post_type = request.form.get('post_type', type=str)
    size = request.form.get('size', type=int)
    age = request.form.get('age', type=int)

    estimation = posting.estimate_value(room, saloon, building_type, post_type, address, size, age, area_df)
    return jsonify({'estimation': int(estimation)})


@app.route('/posting', methods=['GET', 'POST'])
def posting_ops():
    """
        GET
    Returns all postings in the database, after fetching them from database and doing some calculations about bids.
        POST
    Inserts a posting in the database.
    """
    if request.method == 'GET':
        postings = posting.get_all_postings()
        return jsonify({'postings': postings})
    else:
        username = request.form.get('username')

        room = request.form.get('room', type=int)
        saloon = request.form.get('saloon', type=int)
        address = request.form.get('address', type=int)
        building_type = request.form.get('building_type', type=str)
        post_type = request.form.get('post_type', type=str)
        starting_bid = request.form.get('starting_bid', type=int)
        size = request.form.get('size', type=int)
        age = request.form.get('age', type=int)

        posting.add_posting(username, room, saloon, address, building_type, post_type, starting_bid, size, age)
        return jsonify({'code': 1})


@app.route('/raise', methods=['POST'])
def raise_ops():
    """
    Checks it the raise operation is viable:
        - Checks if the user does not raising on his/her own posting.
        - Checks if the user has this amount of credits.
        - Checks if the bid amount is not lower than minimum bid threshold.
    If these conditions are satisfied,
        - Lower the user's credit by bid amount.
        - If there was another user whose bid is just raised by this raise:
            - Pay back his/her credits.
            - Notify with an SMS about the raise.
        - Update the posting document.
        - Calculate new minimum bid for the posting.
        - Return updated posting.
    """
    username = request.form.get('username', type=str)
    bid_amount = request.form.get('bid_amount', type=int)
    posting_id = request.form.get('posting_id', type=str)

    result, old_bidder_gsm = posting.raise_bid_on_posting(username, bid_amount, posting_id)
    if old_bidder_gsm:
        messenger.bid_raised_message(old_bidder_gsm)

    return jsonify(result)


if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
