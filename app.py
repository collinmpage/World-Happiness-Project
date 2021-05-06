import os
import csv
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///world_happiness_all.sqlite"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#################################################
# Create class to get data
#################################################
class Data(db.Model):
    __tablename__ = 'data_all'
    
    id = db.Column(db.Integer, primary_key = True)
    overall_rank = db.Column(db.String(50))
    country_or_region = db.Column(db.String(50))
    happiness_score = db.Column(db.Numeric(2,2))
    gdp_per_capita = db.Column(db.Numeric(2,2))
    social_support = db.Column(db.Numeric(2,2))
    life_expectancy = db.Column(db.Numeric(2,2))
    freedom = db.Column(db.Numeric(2,2))
    generosity = db.Column(db.Numeric(2,2))
    perception_of_government_corruption = db.Column(db.Numeric(2,2))
    year = db.Column(db.String(4))


#################################################
# Create data page w/ sqlite connection
#################################################

@app.route("/data")
def data():

    results = db.session.query(Data.overall_rank, Data.country_or_region, Data.happiness_score, 
    Data.gdp_per_capita, Data.social_support, Data.life_expectancy, Data.freedom, Data.generosity, 
    Data.perception_of_government_corruption, Data.year).all()

    print(results[0])

    return render_template('data.html', data = results)



################################################
# Create home page
#################################################
@app.route("/")
def home():
    return render_template("index.html")


#################################################
# Create visualization page 1
#################################################

@app.route("/happiness_by_country")
def country():
    return render_template("happiness_by_county.html")

#################################################
# Create visualization page 2
#################################################

@app.route("/the_last_5_years")
def years():
    return render_template("the_last_5_years.html")

#################################################
# Create visualization page 2
#################################################

@app.route("/drews_page")
def drew():
    return render_template("drews_page.html")

#################################################
# test
#################################################

@app.route("/test")
def test():
    return render_template("test.html")












# import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

# from flask import Flask, jsonify, render_template, redirect

# #################################################
# # Database Setup
# #################################################
# engine = create_engine("sqlite:///world_happiness.sqlite")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# table_2015 = Base.classes.data_2015
# table_2016 = Base.classes.data_2016
# table_2017 = Base.classes.data_2017
# table_2018 = Base.classes.data_2018
# table_2019 = Base.classes.data_2019

# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################

# # Route to render index.html template using data from Mongo
# @app.route("/")
# def home():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of data"""
#     # Query all tables data
#     results_2015 = session.query(table_2015.["Overall Rank"], table_2015.[""] ).all()
#     results_2016 = session.query(table_2016.column_wanted).all()
#     results_2017 = session.query(table_2017.column_wanted).all()
#     results_2018 = session.query(table_2018.column_wanted).all()
#     results_2019 = session.query(table_2019.column_wanted).all()

#     session.close()
 
#     # Create a dictionary from the row data and append to a list of data_2015
#     data_2015 = []
#     for column1, column2, column3, etc in results:
#         dict_2015 = {}
#         dict_2015["column1"] = column1
#         dict_2015["column2"] = column2
#         dict_2015["column3"] = column3
#         data_2015.append(dict_2015)

#     return render_template("index.html", jsonify(data_2015))


if __name__ == "__main__":
    app.run(debug=True)
