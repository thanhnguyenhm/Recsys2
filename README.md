After cloning to your local machine:

## set up virtual environment
python3 -m venv venv

## activate virtual environment: 
Unix:
    source venv/bin/activate

Windows:
    ./venv/bin/activate
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

## deactivate virtual environment:
deactivate