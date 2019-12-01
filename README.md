After cloning to your local machine:

## create config.js:
Place config.js in frontend/src/

    const API_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = 'insert TMDB API KEY here';
    export {
        API_URL,
        API_KEY,
    }

## set up virtual environment:
Unix:

    python3 -m venv venv

Windows:

    py -m venv venv

## activate virtual environment: 
Unix:

    source venv/bin/activate

Windows:

    ./venv/Scripts/activate

## install dependencies: 
    pip install -r requirements.txt

## run Flask app: 
Unix:

    export FLASK_APP=recsys.py

    export FLASK_DEBUG=1

    flask run

Windows:

    $env:FLASK_APP = "recsys.py"

    flask run

## run React front end:
Unix:

    cd frontend
    
    npm install (only once)
    
    npm start

## deactivate virtual environment:
    deactivate
