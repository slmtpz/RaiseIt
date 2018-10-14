from . import db, ObjectId


def update_user(username, set_dict):
    db.users.update_one({
        'username': username
    }, {
        '$set': set_dict
    })


def update_posting(posting_id, set_dict):
    db.postings.update_one({
        '_id': ObjectId(posting_id)
    }, {
        '$set': set_dict
    })

