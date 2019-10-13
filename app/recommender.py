# algorithms from https://www.kaggle.com/ibtesama/getting-started-with-a-movie-recommendation-system
import pandas as pd
import numpy as np
import sqlite3


conn = sqlite3.connect("tmdb.db")
df1 = pd.read_sql_query("select * from credits;", conn)
df2 = pd.read_sql_query("select * from movies;", conn)

df1.columns = ['id', 'tittle', 'cast', 'crew']
df2 = df2.merge(df1, on='id')

C = df2['vote_average'].mean()
m = df2['vote_count'].quantile(0.9)

q_movies = df2.copy().loc[df2['vote_count'] >= m]
q_movies.shape


def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    # Calculation based on the IMDB formula
    return (v / (v + m) * R) + (m / (m + v) * C)


# Define a new feature 'score' and calculate its value with `weighted_rating()`
q_movies['score'] = q_movies.apply(weighted_rating, axis=1)

# Sort movies based on score calculated above
q_movies = q_movies.sort_values('score', ascending=False)

# Print the top n movies
def top_n_movies(n):
    # return dict(zip(list(q_movies['title'].head(n)), list(q_movies['poster_path'].head(n)))
    zipOb = zip(list(q_movies['title'].head(n)), list(q_movies['poster_path'].head(n)))
    return dict(zipOb)
