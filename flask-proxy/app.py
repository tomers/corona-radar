#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from requests import get

app = Flask(__name__)
CORS(app)

SITE_NAME = 'https://gisweb.azureedge.net/'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
  return get(f'{SITE_NAME}{path}').content

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8888)

