from raiseitmongo import searcher, inserter, updater
from utils import helpers
from variables import FACTORS


def add_posting(username, room, saloon, address, building_type, post_type, starting_bid, size, age):
    current_bid = 0
    bid_count = 0
    current_bidder = None
    inserter.insert_one_posting(username, room, saloon, address, building_type, post_type, starting_bid, size,
                                age, current_bid, current_bidder, bid_count)


def get_all_postings():
    postings = searcher.find_postings()
    for posting in postings:
        posting['minimum_bid'] = helpers.get_minimum_bid_for_posting(posting)
        posting['_id'] = str(posting['_id'])
    return postings


def get_posting(posting_id):
    posting = searcher.find_posting(posting_id)
    return posting


def update_posting_for_raise(posting_id, bid_count, current_bid, current_bidder):
    updater.update_posting(posting_id, {
        'bid_count': bid_count,
        'current_bid': current_bid,
        'current_bidder': current_bidder
    })


def raise_bid_on_posting(username, bid_amount, posting_id):
    from .user import get_user, update_credits
    from reasons import REASONS
    current_bidder_doc = {'gsm': None}

    # fetch corresponding user and posting documents from database
    user_doc = get_user(username)
    posting_doc = get_posting(posting_id)

    # check varying cases that should not be happening
    if user_doc['credit'] < bid_amount:
        return {'code': 0, 'reason': REASONS[1000]}, current_bidder_doc['gsm']
    if posting_doc['username'] == user_doc['username']:
        return {'code': 0, 'reason': REASONS[1001]}, current_bidder_doc['gsm']
    minimum_bid = helpers.get_minimum_bid_for_posting(posting_doc)
    if bid_amount < minimum_bid:
        return {'code': 0, 'reason': REASONS[1002]}, current_bidder_doc['gsm']

    # lower user's credits by bid amount
    update_credits(username, user_doc['credit'], -bid_amount)
    # if there is another bidder whose bid is just being raised, give his/her credits back
    if posting_doc['current_bidder']:
        current_bidder = posting_doc['current_bidder']
        current_bidder_doc = get_user(current_bidder)
        update_credits(current_bidder, current_bidder_doc['credit'], posting_doc['current_bid'])
    # update posting
    new_bid_count = posting_doc['bid_count'] + 1
    new_current_bid = bid_amount
    new_current_bidder = username
    update_posting_for_raise(posting_id, new_bid_count, new_current_bid, new_current_bidder)

    # fetch updated posting
    updated_posting_doc = get_posting(posting_id)
    # calculate new minimum bid
    updated_posting_doc['minimum_bid'] = helpers.get_minimum_bid_for_posting(updated_posting_doc)
    updated_posting_doc['_id'] = str(updated_posting_doc['_id'])

    return {'code': 1, 'posting': updated_posting_doc}, current_bidder_doc['gsm']


def estimate_value(room, saloon, building_type, post_type, address, size, age, area_df):
    factor = FACTORS['BASE']
    factor *= FACTORS['ROOMS'](room)
    factor *= FACTORS['SALOONS'](saloon)
    factor *= FACTORS['BUILDING_TYPES'](building_type)
    factor *= FACTORS['POST_TYPES'](post_type)
    factor *= FACTORS['SIZE'](size)
    factor *= FACTORS['AGE'](age)
    factor *= FACTORS['ADDRESS'](address, area_df)
    return factor
