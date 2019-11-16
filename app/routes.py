from flask import render_template, url_for, request, redirect, flash, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from app import app, db, bcrypt, jwt
from app.forms import LoginForm, SignupForm
from flask_login import login_user, logout_user, current_user, login_required
from app.models import User, MovieRating
from werkzeug.urls import url_parse
from app.recommender import top_n_movies
from app.all_movies import all_movies
from flask_jwt_extended import (create_access_token)
import pandas as pd
import numpy as np
import sqlite3
from collections import OrderedDict



@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():
    topN = top_n_movies(50)
    #return jsonify(topN)

    top_movies = []

    conn = sqlite3.connect("tmdb.db")
    cur = conn.cursor()

    for movie in topN:
    # find poster using the title
        #query = "select * from movies where title = '" + movie + "';"
        #cur.execute(query)
        cur.execute("select * from movies where title = ?", (movie,))
        for result in cur:
            # index 20: poster path
            # index 3: movie id
            poster = result[20]
            movie_id = result[3]
            top_movies.append(
            # Added movie_id
                {'title': movie, 'rating': 0, 'poster_path': poster, 'movie_id': movie_id})
    return jsonify({'movies': top_movies})

@app.route('/browse/<page_number>', methods=['POST', 'GET'])
def browse(page_number):
    movies = all_movies()
    page = int(page_number)
    start = (page - 1) * 48
    end = start + 48
    movies_page = sorted(list(movies))[start:end]
    #movies_dict = {i : movies[i] for i in movies_page}

    movies_dict = []

    conn = sqlite3.connect("tmdb.db")
    cur = conn.cursor()

    for movie in movies_page:
    # find poster using the title
        #query = "select * from movies where title = '" + movie + "';"
        #cur.execute(query)
        cur.execute("select * from movies where title = ?", (movie,))
        for result in cur:
            # index 20: poster path
            # index 3: movie id
            poster = result[20]
            movie_id = result[3]
            movies_dict.append(
            # Added movie_id
                {'title': movie, 'rating': 0, 'poster_path': poster, 'movie_id': movie_id})
    
    return jsonify(movies_dict)
    #return json.dumps(movies_dict)

@app.route('/users/login', methods=['GET', 'POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""
    user = User.query.filter_by(username=username).first()
    if user is None:
        result = jsonify({"Error": "Invalid username or password"})
    elif bcrypt.check_password_hash(user.get_password(), password):
        login_user(user)
        access_token = create_access_token(identity= {"username": user.get_username(),
        "email": user.get_email()})
        result = access_token
    else: 
        result = jsonify({"error": "Invalid username and password"})

    return result

@app.route('/users/register', methods=['GET', 'POST'])
def signup():
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    result = {
        'username': username,
        'email': email,
        'password': password
    }
    return jsonify({'result': result})

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

# Search function
@app.route('/movies', methods=['GET'])
def movies():
    query = request.args.get('search')
    limit = request.args.get('limit')

    conn = sqlite3.connect("tmdb.db")
    cur = conn.cursor()
    cur.execute("select * from movies where title like '%" +
                query + "%' limit " + str(limit) + ";")

    searched_movies = []

    for result in cur:
        # index 6: movie title, index 20: poster path
        movie_title = result[6]
        poster = result[20]
        movie_id = result[3]
        searched_movies.append(
            {'title': movie_title, 'rating': 0, 'poster_path': poster, 'movie_id': movie_id})
    return jsonify({'movies': searched_movies})


# Show rated movies
@app.route('/rated_movies/<user>')
def rated_movies(user):
    movie_list = MovieRating.query.filter_by(username=user)
    # movie_list = MovieRating.query.all()
    rated_movies = []

    conn = sqlite3.connect("tmdb.db")
    cur = conn.cursor()
    
    for movie in movie_list:
        # find poster using the title
        #query = "select * from movies where title = '" + movie.title + "';"
        #cur.execute(query)
        cur.execute("select * from movies where title = ?", (movie.title,))
        for result in cur:
            # index 20: poster path
            # index 3: movie id
            poster = result[20]
            movie_id = result[3]
        rated_movies.append(
            # Added movie_id
            {'title': movie.title, 'rating': movie.rating, 'poster_path': poster, 'movie_id': movie_id})
    return jsonify({'movies': rated_movies})


# Add rating to movie
@app.route('/add_rating', methods=['GET', 'POST'])
def add_rating():
    movie_data = request.get_json()

    # check if current rating exists
    rating = MovieRating.query.filter_by(title=movie_data['title'], username=movie_data['user']).first()
    if rating is not None:
        db.session.delete(rating)
        db.session.commit()

    movie_rating = MovieRating(
        title=movie_data['title'], rating=movie_data['rating'], username=movie_data['user'])

    if movie_data['rating'] != 0:
        db.session.add(movie_rating)
        db.session.commit()

    return 'Done', 201
