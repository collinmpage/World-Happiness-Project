// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
  width = 700 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../Cleaned_Data/cleaned_all.csv", function(allData) {
  // create date parser
  var dateParser = d3.timeParse("%Y");

  // parse data
  allData.forEach(function(data) {
      data.year = dateParser(data.year);
      data.overall_rank = +data.overall_rank;
      data.happiness_score = +data.happiness_score;
  });

  // List of all countries
  var allGroup = d3.map(allData, function(d){return(d.country_or_region)}).keys()
  // var countries_sorted = allGroup.sort()
  // console.log(countries_sorted)

  // // Set default country name
  // d3.select("#countryname")
  //   .selectAll('div')
  //     .data(allData)
  //   .enter()
  //     .append('text')
  //   .text(d => d.country_or_region[0])
    // Want text to say [Country] was ranked #[overall_rank] in 2019!

  // Add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
      .data(allGroup)
    .enter()
      .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button


  // Add X axis
  var x = d3.scaleTime()
    .domain(d3.extent(allData, d => d.year))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(allData.filter(function(d){return d.country_or_region==allGroup[0]}), d => d.overall_rank)])
    .range([ height, 0 ]);
  svg.append("g")
    .classed("y-axis", true)
    .call(d3.axisLeft(y));

  // Y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Overall Rank");

  // Initialize line with first group of the list
  var line = svg
    .append('g')
    .append("path")
      .datum(allData.filter(function(d){return d.country_or_region==allGroup[0]}))
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(d.overall_rank) })
      )
      .attr("stroke", "black")
      .style("stroke-width", 4)
      .style("fill", "none")

  // Initialize dots with first group of the list
  var circles = svg
    .selectAll('circle')
    .data(allData.filter(function(d){return d.country_or_region==allGroup[0]}))
    .enter()
    .append('circle')
    .attr("cx", function(d) { return x(d.year) })
    .attr("cy", function(d) { return y(d.overall_rank) })
    .attr("r", 8)
    .style("fill", "#69b3a2")
    .attr("stroke-width", "1")
    .attr("stroke", "black");

  // Add tooltip
  var toolTip = d3.select("#chart")
    .append("div")
    .classed("tooltip", true)

  // Create "mouseover" event listener to display tooltip
  circles.on("mouseover", function(d) {
    toolTip.style("display", "block")
      .html(
        `<strong>${d.year}</strong><hr>
        Overall Rank: ${d.overall_rank}</br>
        Happiness Score: ${d.happiness_score}`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  })

    // Create "mouseout" event listener to hide tooltip
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });



  // A function that update the chart
  function update(selectedGroup) {

    // Create new data with the selection?
    var dataFilter = allData.filter(function(d){return d.country_or_region==selectedGroup})

    // // update the country name selected
    // d3.select("#countryname")
    //   .selectAll('text')
    //     .data(dataFilter)
    //   .enter()
    //     .append('text')
    //   .attr("value", function(d) {return d.country_or_region})
    //   // Want text to say [Country]'s Happiness Score over the Last 5 Years

    // Update the y-axis
    y = d3.scaleLinear()
      .domain([0, d3.max(dataFilter, d => d.overall_rank)])
      .range([ height, 0 ]);
    svg.select(".y-axis")
      .selectAll("g")
      .remove()
    svg.append("g")
      .call(d3.axisLeft(y));

    // Give these new data to update line
    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(d.overall_rank) })
      )
      .attr("stroke", "black")
    
    circles
      .data(dataFilter)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.year) })
        .attr("cy", function(d) { return y(d.overall_rank) })

  }

  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      update(selectedOption)
  })

})