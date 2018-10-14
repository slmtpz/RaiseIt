from . import db, ObjectId


def find_one_user(username):
    response = db.users.find_one({'username': username})
    return response


def check_login_user(username, password):
    response = db.users.find_one({'username': username, 'password': password})
    return response


def find_postings():
    cursor = db.postings.find({})
    return list(cursor)


def find_posting(posting_id):
    response = db.postings.find_one({'_id': ObjectId(posting_id)})
    return response
