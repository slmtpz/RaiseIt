from . import db


def insert_one_user(username, password, credit):
    db.users.insert_one({
        'username': username,
        'password': password,
        'credit': credit
    })


def insert_one_posting(username, room, saloon, address, building_type, post_type, starting_bid, size,
                       floor, age, expiration_time, current_bid, bid_count):
    db.postings.insert_one({
        'username': username,
        'building_type': building_type,
        'post_type': post_type,
        'room': room,
        'saloon': saloon,
        'address': address,
        'size': size,
        'floor': floor,
        'age': age,
        'starting_bid': starting_bid,
        'expiration_age': expiration_time,
        'current_bid': current_bid,
        'bid_count': bid_count
    })
