console.log(`a string insideof there`)

var geoData = '../../Cleaned_Data/countries.geojson'
var csv2015 = '../../Cleaned_Data/cleaned_2015.csv'

var csvData = $.csv.toArrays(csv2015);
console.log(csvData);

d3.json(geoData).then(function(data) {

    console.log(data)


    // .then () => {}
    // d3.csv(csv2015).then(function(csvData){
    //     // console.log(csvData)

    //     for(var i = 0; i < data.features.length; i++){
    //         var geoStuff = data.features[i].properties.name_long
    //         // console.log(geoStuff)
    //         // console.log(csvData.length)
    //         console.log('hit');
    //         // for(var j = 0; j < csvData.length; j++){
    //         // console.log(j, csvData[j].country_or_region)
    //             // console.log('hit');
    //             // var csvStuff = csvData[j].country_or_region
    //             // console.log(csvStuff)
    //         //  if(geoStuff == csvStuff) {
    //         //      geoData.features[j].properties.happiness = csvData[i].happiness
    //         // }
    //     // }
    // }
})
// }) 