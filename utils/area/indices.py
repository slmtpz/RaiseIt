import pandas as pd

df = pd.read_csv('utils/area/area_indices.csv')
df.indices = df.indices / df.iloc[0].indices
