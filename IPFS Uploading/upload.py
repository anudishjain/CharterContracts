from flask import *
from ipfsapi import *

app = Flask(__name__)

allowed_ext = ['pdf', 'jpg', 'jpeg', 'png', 'docx']


def allowed(filename):

    return filename.split(".")[-1] in allowed_ext


@app.route('/')

def hello():
    return "Welcome to Charter's IPFS Gateway"


@app.route('/upload', methods = ['POST'])

def fileupload():

    file = request.files['file']

    if file and allowed(file.filename):

        api = connect('ipfs.infura.io', 5001)
        res = api.add(str(file.filename))

        return res


if __name__ == '__main__':
    app.run(debug=True)





