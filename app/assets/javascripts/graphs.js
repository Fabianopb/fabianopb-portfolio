var CHARTS = (function() {

	var drawSkills = function(data) {
		var margin = {top: 20, right: 20, bottom: 20, left: 20},
  		width = 240 - margin.left - margin.right,
  		height = 240 - margin.top - margin.bottom;

  	var x = d3.scale.ordinal().rangeBands([0, width]),
      y = d3.scale.linear().range([height, 0]);

	  var svg = d3.select(".test-graph")
			.append("svg")
		  .attr("width", width + margin.left + margin.right)
		  .attr("height", height + margin.top + margin.bottom)
			.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x.domain(data.map(function(d) {
      return d.skill;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

    gapWidth = x.rangeBand() * 0.2;

		svg.selectAll(".data-bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "data-bar")
      .attr("x", function(d) {
        return x(d.skill) + gapWidth / 2;
      })
      .attr("width", x.rangeBand() - gapWidth)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
      // .transition()
      // .duration(500)
      // .attr("y", function(d) {
      //   return y(d.value);
      // })
      // .attr("height", function(d) {
      //   return height - y(d.value);
      // });
	};

	return {
		drawSkills: drawSkills
	};

})();

var DATASERVICE = (function () {

	window.onload = function() {

		$.ajax({
		  type: "GET",
		  contentType: "application/json; charset=utf-8",
		  url: 'data/get_data',
		  dataType: 'json',
		  data: "{}", 
		  success: function (data) {
		    CHARTS.drawSkills(data);
		  },
			error: function (error) {
				console.log(error);
		  }
		});

	}

})();