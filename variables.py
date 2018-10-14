# A new bid can be at minimum, the current bid times this factor.
MINIMUM_BID_FACTOR = 1.15

# factors should be calculated, using regression on a real-estate data set.
FACTORS = {
    'BASE': 500,
    'ROOMS': lambda x: {1: 1, 2: 1.15, 3: 1.25, 4: 1.50}[x],
    'SALOONS': lambda x: {1: 1, 2: 1.25}[x],
    'BUILDING_TYPES': lambda x: {'Daire': 1, 'Residans': 1.5, 'Mustakil Ev': 2, 'Villa': 2.5}[x],
    'POST_TYPES': lambda x: {'Kiralik': 1, 'Satilik': 2000}[x],
    'SIZE': lambda x: x/80,
    'AGE': lambda x: 1-x/60,
    'ADDRESS': lambda x, y: float(y[y.areas == x].indices)
}