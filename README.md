# Team project for Software Engineering class

**Website: https://recsys.netlify.com**

For demonstration purpose, use account __*guest*__, password __*123*__.

There're some differences between production and development environment:
- Need to manually refresh the page when rating and removing ratings to see changes in Profile page
- It may take 5-10 seconds for recommendation engine to compute. If it takes longer, refresh the page.
- Databases in two environments are different.


# Local environment setup (require API KEY from TMDB)

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

    flask run

Windows:

    $env:FLASK_APP = "recsys.py"

    flask run

## run React front end:
Unix/Windows:

    cd frontend
    
    npm install (only once)
    
    npm start
