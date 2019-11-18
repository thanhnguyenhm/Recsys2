# algorithms from https://www.kaggle.com/ibtesama/getting-started-with-a-movie-recommendation-system
import pandas as pd
import numpy as np
from functools import reduce
from ast import literal_eval
import sqlite3
from collections import OrderedDict
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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
    #zipOb = zip(list(q_movies['title'].head(n)), list(q_movies['poster_path'].head(n)))
    #return OrderedDict(zipOb)
    return list(q_movies['title'].head(n))


def combine_features(row):
    try:
        return row['keywords'] + " " + row['cast'] + " " + row["genres"] + " " + row["director"]
    except:
        print("Error:", row)


def ctb_recommender(movie_user_likes, num, cosine_sim, df):
    similar_movies = []

    movie_index = df[df.title == movie_user_likes]["index"].values[0]
    similar_movies = list(enumerate(cosine_sim[movie_index]))
    
    # Get a list of similar movies in descending order of similarity score
    sorted_similar_movies = sorted(similar_movies, key=lambda x: x[1], reverse=True)

    # return list of titles of movies
    res = []
    i = 0
    for element in sorted_similar_movies[1:]:
        res.append(df[df.index == element[0]]["title"].values[0])
        i = i + 1
        if i >= num:
            break 

    return res

def get_recommendation(rated_movies):
    # prepare dataframe
    df = pd.read_csv("app/improved_tmdb_5000.csv")

    # select features for recommender
    features = ['keywords', 'cast', 'genres', 'director']
    for feature in features:
        df[feature] = df[feature].fillna('')
    df["combined_features"] = df.apply(combine_features, axis=1)

    # Create count matrix 
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(df["combined_features"])

    # Compute the Cosine Similarity based on the count_matrix
    cosine_sim = cosine_similarity(count_matrix)

    # number of total recommendation to be shown on profile page
    total_recommendation = 30

    # sort rated_movies list based on ratings
    sorted_rated_movies = sorted(rated_movies, key=lambda m: m.get('rating'), reverse=True)

    # calculate how many recommendations for each movie in rated_movies based on ratings
    # --------------------------------------------------------------------
    # sum of all ratings from rated_movies
    total_ratings = reduce(lambda x, y: x + y, 
                    list(map(lambda m: m.get('rating'), sorted_rated_movies)))

    # create a new list of dictionaries with two keys: title: movie title, 
    # num: number of recommended movies for that title
    new_rated_movies = []
    for movie in sorted_rated_movies:
        new_rated_movies.append({'title': movie.get('title'),
                        'num': round(movie.get('rating') / total_ratings * total_recommendation)})

    # get recommended movies for each movies and combine into the list
    recommended_movies_list = []
    for movie in new_rated_movies:
        recommended_movies_list.extend(ctb_recommender(
            movie.get('title'), movie.get('num'), cosine_sim, df))

    return recommended_movies_list




# for testing only - To be deleted
# --------------------------------------------------
# rated_movies = [{'title': 'Forrest Gump', 'rating': 4},
#                 {'title': 'Inception', 'rating': 3},
#                 {'title': 'Black Swan', 'rating': 5}]
# # get_recommendation(sorted(rated_movies, key=lambda m: m.get('rating'), reverse=True)) # will return 20 recommended movies
# # ctb_recommender(
# #     sorted(rated_movies, key=lambda m: m.get('rating'), reverse=True))
# get_recommendation(rated_movies)
