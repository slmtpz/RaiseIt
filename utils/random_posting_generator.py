import random
from utils.area.indices import df

# todo: machine learning over web scraped data or apis if available


def generate():
    ROOMS = {1: 1, 2: 1.15, 3: 1.25, 4: 1.50}
    SALOONS = {1: 1, 2: 1.25}
    BUILDING_TYPES = {'Daire': 1, 'Residans': 1.5, 'Mustakil Ev': 2, 'Villa': 2.5}
    POST_TYPES = {'Kiralik': 1, 'Satilik': 2000}

    room = random.randint(1, 4)
    room_index = ROOMS[room]

    saloon = random.randint(1, 2)
    saloon_index = SALOONS[saloon]

    random_address = df.iloc[random.randint(0, len(df)-1)]
    address = random_address.areas
    address_index = random_address.indices

    building_type_int = random.randint(0,3)
    building_type = list(BUILDING_TYPES.keys())[building_type_int]
    building_type_index = list(BUILDING_TYPES.values())[building_type_int]

    post_type_int = random.randint(0,1)
    post_type = list(POST_TYPES.keys())[post_type_int]
    post_type_index = list(POST_TYPES.values())[post_type_int]

    size = random.randint(12, 50)*5
    size_index = size/12/5

    age = random.randint(0, 30)
    age_index = 1 - age/60

    number = 500
    print('room', room)
    print('saloon', saloon)
    print('address', address)
    print('building_type', building_type)
    print('post_type', post_type)
    print('age', age)
    print('size', size)
    factor = room_index * saloon_index * address_index * building_type_index * post_type_index * size_index * age_index
    print('total factor', int(factor))
    print('suggested price', int(factor*number))

    print()
    print('room_index', room_index)
    print('saloon_index', saloon_index)
    print('address_index', address_index)
    print('building_type_index', building_type_index)
    print('post_type_index', post_type_index)
    print('size_index', size_index)
    print('age_index', age_index)

    username = ['orbay', 'seleme'][random.randint(0,1)]

    return {
        'username': username,
        'room': room,
        'saloon': saloon,
        'address': address,
        'building_type': building_type,
        'post_type': post_type,
        'age': age,
        'size': size,
        'starting_bid': int(factor*number),
        'bid_count': 0,
        'current_bid': 0,
        'current_bidder': None,
        'expiration_time': random.randint(60, 3600)
    }
