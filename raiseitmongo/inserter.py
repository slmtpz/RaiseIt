from . import db


def insert_one_user(username, password, gsm):
    db.users.insert_one({
        'username': username,
        'password': password,
        'gsm': gsm,
        'credit': 0
    })


def insert_one_posting(username, room, saloon, address, lat, lng, building_type, post_type, starting_bid, size,
                       age, expiration_time, current_bid, current_bidder, bid_count):
    db.postings.insert_one({
        'username': username,
        'building_type': building_type,
        'post_type': post_type,
        'room': room,
        'saloon': saloon,
        'address': address,
        'lat': lat,
        'lng': lng,
        'size': size,
        'age': age,
        'starting_bid': starting_bid,
        'expiration_time': expiration_time,
        'current_bid': current_bid,
        'current_bidder': current_bidder,
        'bid_count': bid_count
    })
