from raiseitmongo import searcher, inserter
from variables import MINIMUM_BID_FACTOR


def add_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                age, expiration_time):
    current_bid = starting_bid
    bid_count = 0
    current_bidder = None
    inserter.insert_one_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                                age, expiration_time, current_bid, current_bidder, bid_count)


def get_all_postings():
    postings = searcher.find_postings()
    for posting in postings:
        if posting['current_bid'] == 0:
            posting['minimum_bid'] = posting['starting_bid']
        else:
            posting['minimum_bid'] = posting['current_bid'] * MINIMUM_BID_FACTOR
        posting['_id'] = str(posting['_id'])
    return postings
