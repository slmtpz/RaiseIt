from raiseitmongo import searcher, inserter


def add_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                age, expiration_time):
    current_bid = starting_bid
    bid_count = 0
    current_bidder = None
    inserter.insert_one_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                                age, expiration_time, current_bid, current_bidder, bid_count)
