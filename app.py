import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, redirect

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
table_2015 = Base.classes.cleaned_info_2015
table_2016 = Base.classes.cleaned_info_2016
table_2017 = Base.classes.cleaned_info_2017
table_2018 = Base.classes.cleaned_info_2018
table_2019 = Base.classes.cleaned_info_2019

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of data"""
    # Query all tables data
    results_2015 = session.query(table_2015.column_wanted).all()
    results_2016 = session.query(table_2016.column_wanted).all()
    results_2017 = session.query(table_2017.column_wanted).all()
    results_2018 = session.query(table_2018.column_wanted).all()
    results_2019 = session.query(table_2019.column_wanted).all()

    session.close()
 
    # Create a dictionary from the row data and append to a list of data_2015
    data_2015 = []
    for column1, column2, column3, etc in results:
        dict_2015 = {}
        dict_2015["column1"] = column1
        dict_2015["column2"] = column2
        dict_2015["column3"] = column3
        data_2015.append(dict_2015)

    return render_template("index.html", jsonify(data_2015))


if __name__ == "__main__":
    app.run(debug=True)
