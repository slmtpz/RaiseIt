from . import db


def insert_one_user(username, password, credit):
    response = db.users.insert_one({
        'username': username,
        'password': password,
        'credit': credit
    })
    return response
