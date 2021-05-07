# World-Happiness-Project
Creating and Presenting world happiness Data using JavaScript and other front end resources.

## Overview
In this project, we used a dataset from Kaggle on World Happiness which can be seen [here](https://www.kaggle.com/unsdsn/world-happiness). We created a web app that includes an interactive line chart, and an interactive map.

### ETl Process
In jupyter notebook, we loaded in the original CSVs [found here](Data). With each CSV, we used python pandas to delete columns that were deemed unecessary, rename and reorder the columns that we wanted to keep in order to normalize each dataset. Finally, we added these dataframes to sql tables and exported them to a sqlite file. 

Additionally, we imported the CSVs and a JSON file in order to combine the two. In jupyter notebook, we used nested for loops to create a list of lists to incorporate the CSV into the GeoJSON file. Finally, we exported this new combined data to a GeoJSON file. 

These items can be viewed in the [cleaning_data_to_sqlite.ipynb](cleaning_data_to_sqlite.ipynb) and [update_json.ipynb](update_json.ipynb) files.

### Flask App
For the Flask App we did the following main items:
* Setup Flask and the sqlite database
* Created a Data page with a connection to the sqlite database
* Created routes for the homepage and visualizations

The code for these items can be viewed in the [app.py](app.py) file.

### HTML & CSS


### Visualizations and App Pages
Our final App includes the following pages:
1. **Homepage** ![Homepage](images/homepage.png)
    Code for this page can be viewed in the following files: [index.html](templates/index.html) and [styles.css](static/css/styles.css)
2. **Happiness by Country** ![happiness_by_country](images/happiness_by_country.png) 
    Code for this page can be viewed in the following files: [logic_2015.js](static/js/logic_2015.js), [happiness_by_country.html](templates/happiness_by_country.html)
3. **Happiness: The Last 5 Years** ![happiness_last_5_years](images/happiness_last_5_years.png)
    Code for this page can be viewed in the following files: [yearlyPlot.js](static/js/yearlyPlot.js), (the_last_5_years.html)[templates/the_last_5_years.html]
4. **Final Data** ![final_data](images/raw_data.png)
    Code for this page can be viewed within the [app.py](app.py) file. 
5. **ArcGIS Example** ![arcGIS](images/arcGIS.png)
    Code for this page can be viewed within the [drews_page.html](templates/drews_page.html)

## Conclusions