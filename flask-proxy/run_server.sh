#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd ${SCRIPTPATH}
python3 -m venv env
source ./env/bin/activate

pip3 install -r ./requirements.txt

./app.py
