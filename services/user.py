from raiseitmongo import searcher, inserter, updater


def get_user(username):
    response = searcher.find_one_user(username)
    response['_id'] = str(response['_id'])
    return response


def get_user_with_pass(username, password):
    response = searcher.check_login_user(username, password)
    response['_id'] = str(response['_id'])
    return response


def register_user(username, password):
    # todo: is username unique field ? check to send fail status
    initial_dummy_credit = 500000
    inserter.insert_one_user(username, password, initial_dummy_credit)
    return get_user(username)


def update_credits(username, current_credits, credit_change):
    updater.update_user(username, {'credit': current_credits + credit_change})
