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

#################################################
# test
#################################################

@app.route("/2017")
def test2():
    return render_template("2017_map.html")

# #################################################
# # test
# #################################################

@app.route("/2018")
def test3():
    return render_template("2018_map.html")

# #################################################
# # test
# #################################################

@app.route("/2019")
def test4():
    return render_template("2019_map.html")









if __name__ == "__main__":
    app.run(debug=True)
