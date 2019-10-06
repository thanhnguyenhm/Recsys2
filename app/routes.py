from flask import render_template, url_for, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from app import app
from app.forms import LoginForm, SignupForm


@app.route('/', methods=['POST', 'GET'])
def index():
        return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect(url_for('index'))
    return render_template('login.html',  title='Log In', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        flash('Signup requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect(url_for('index'))
    return render_template('signup.html',  title='Sign Up', form=form)
