After cloning to your local machine:

## set up virtual environment
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

## setup Flask app: 
Unix:

    export FLASK_APP=recsys.py

    export FLASK_DEBUG=1

Windows:

    $env:FLASK_APP = "recsys.py"

## set up react:

    cd react_frontend
	
    npm install

To stop venv:
## deactivate virtual environment:
    deactivate
	
To run project:
## run flask (on terminal with venv):

	flask run
	
## start react (on a separate terminal):

	npm start