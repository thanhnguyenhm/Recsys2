from flask import render_template, url_for, request, redirect, flash, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from app import app, db, bcrypt, jwt
from app.forms import LoginForm, SignupForm
from flask_login import login_user, logout_user, current_user, login_required
from app.models import User
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
    return json.dumps(topN)

@app.route('/browse/<page_number>', methods=['POST', 'GET'])
def browse(page_number):
    movies = all_movies()
    page = int(page_number)
    start = (page - 1) * 48
    end = start + 48
    movies_page = sorted(list(movies))[start:end]
    movies_dict = {i : movies[i] for i in movies_page}
    return json.dumps(movies_dict)

@app.route('/users/login', methods=['GET', 'POST'])
def login():
    ###########################################
    ############### FLASK VERSION ##############
    ###########################################
    # if current_user.is_authenticated:
    #     # return redirect(url_for('index'))
    #     return redirect(url_for('index'))
    # form = LoginForm()
    # if form.validate_on_submit():
    #     user = User.query.filter_by(username=form.username.data).first()
    #     if user is None or not user.check_password(form.password.data):
    #         flash('Invalid username or password')
    #         return redirect(url_for('login'))
    #     login_user(user, remember=form.remember_me.data)
    #     return redirect(url_for('index'))
    # return render_template('login.html',  title='Log In', form=form)
    ###########################################
    ################ API VERSION ##############
    ###########################################
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
    ###########################################
    ############### FLASK VERSION ##############
    ###########################################
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))
    # form = SignupForm()
    # if form.validate_on_submit():
    #     user = User(username=form.username.data, email=form.email.data)
    #     user.set_password(form.password.data)
    #     db.session.add(user)
    #     db.session.commit()
    #     flash('Congratulations, you are now a registered user!')
    #     return redirect(url_for('login'))
    # return render_template('signup.html',  title='Sign Up', form=form)
    ###########################################
    ################ API VERSION ##############
    ###########################################
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

@app.route('/movies', methods=['GET'])
def movies():
    # NOT DONE. HOW TO CONNECT TO TMDB?
    # params from search.js
    #   query: string - substrings to filter for
    #   limit: int - number of items to get
    query = request.args.get('search')
    limit = request.args.get('limit')

    conn = sqlite3.connect("tmdb.db")
    cur = conn.cursor()
    cur.execute("select * from movies where title like '%" +
                query + "%' limit " + str(limit) + ";")

    movies = []

    for result in cur:
        # index 6: movie title, index 20: poster path
        movies.append({'title': result[6], 'poster_path': result[20]})

    return jsonify({'movies': movies})
