from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, support_credentials=True)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
login = LoginManager(app)
jwt = JWTManager(app)
login.login_view = 'login'

from app import routes, models
