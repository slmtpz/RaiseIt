from . import db


def find_one_user(username, password):
    response = db.users.find_one({'username': username, 'password': password})
    return response


def find_postings():
    cursor = db.postings.find({})
    return list(cursor)
