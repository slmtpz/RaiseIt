from flask import Flask, render_template, request, jsonify
from services import auth
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def main_page():
    return render_template('index.html')


@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username', type=str)
    password = request.form.get('password', type=str)
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


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
