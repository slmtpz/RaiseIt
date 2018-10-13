from flask import Flask, render_template
from flask_pymongo import PyMongo
import config

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://%s:%s@%s/%s" % (config.MONGO['USERNAME'],
                                                     config.MONGO['PASSWORD'],
                                                     config.MONGO['HOSTPORT'],
                                                     config.MONGO['DATABASE'])
mongo = PyMongo(app)


@app.route('/')
def main_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
