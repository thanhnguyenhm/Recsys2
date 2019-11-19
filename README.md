After cloning to your local machine:

## set up virtual environment
Unix:

    python3 -m venv venv

Windows:

    virtualenv -p python3 venv

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
