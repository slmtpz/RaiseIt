from raiseitmongo import searcher, inserter


def get_user(username, password):
    response = searcher.find_one_user(username, password)
    response['_id'] = str(response['_id'])
    return response


def register_user(username, password):
    # todo: is username unique field ? check to send fail status
    initial_dummy_credit = 500000
    inserter.insert_one_user(username, password, initial_dummy_credit)
    return get_user(username, password)
