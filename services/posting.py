from raiseitmongo import searcher, inserter


def add_posting(username, room, saloon, address, building_type, post_type, starting_bid, size,
                floor, age, expiration_time):
    current_bid = starting_bid
    bid_count = 0
    inserter.insert_one_posting(username, room, saloon, address, building_type, post_type, starting_bid, size,
                                floor, age, expiration_time, current_bid, bid_count)
