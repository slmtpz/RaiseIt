from variables import MINIMUM_BID_FACTOR


def get_minimum_bid_for_posting(posting):
    if posting['current_bid'] == 0:
        minimum_bid = posting['starting_bid']
    else:
        minimum_bid = posting['current_bid'] * MINIMUM_BID_FACTOR
    return int(minimum_bid)
