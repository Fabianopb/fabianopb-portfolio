var CHARTS = (function() {

	var triggerSkillsGraph = true;
	var skillsData;
	var skillsTransition;
	
	var drawSkills = function(data) {

		skillsData = data;

		var barHeight = 24,
			barGap = 8;

		var marginTop = 60;

		var width = 600,
  		height = (barHeight + barGap) * data.length;

  	var x = d3.scale.linear()
  		.domain([0, 100])
  		.range([0, width]);

  	var y = d3.scale.linear()
  		.domain([0, data.length])
  		.range([0, height]);

	  var svg = d3.select(".skills-graph-container")
			.append("svg")
		  .attr("width", width)
		  .attr("height", height + marginTop)
			.append("g")
			.attr("transform", "translate(0," + marginTop + ")");

		svg.selectAll(".skill-scale")
	  	.data(['BEGINNER', 'PROFICIENT', 'EXPERT'])
	  	.enter().append("text")
	    .attr("class", "skill-scale")
      .attr("x", function(d, i) { return (((i + 1) * 2) - 1) * width / 6; })
      .attr("y", -marginTop / 2)
      .attr("dy", "0.25em")
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

    svg.selectAll(".scale-division")
    	.data([1, 2])
    	.enter().append("line")
      .attr("class", "scale-division")
      .attr("x1", function(d) { return width * d / 3; })
      .attr("y1", -marginTop + barGap * 2)
      .attr("x2", function(d) { return width * d / 3; })
      .attr("y2", -barGap * 2)
      .attr("stroke-width", 1);

    svg.selectAll(".back-bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "back-bar")
      .attr("rx", 5)
    	.attr("ry", 5)
      .attr("x", 0)
      .attr("y", function(d, i) { return y(i); })
      .attr("width", width)
      .attr("height", barHeight);

		var dataBars = svg.selectAll(".data-bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "data-bar")
      .attr("rx", 5)
    	.attr("ry", 5)
      .attr("x", 0)
      .attr("y", function(d, i) { return y(i); })
      .attr("width", 0)
      .attr("height", barHeight);

	  svg.selectAll(".skill-name")
	  	.data(data)
	  	.enter().append("text")
	    .attr("class", "skill-name")
      .attr("x", 10)
      .attr("y", function(d, i) { return y(i) + barHeight / 2; })
      .attr("dy", "0.25em")
      .text(function(d) { return d.skill_name; });

    svg.selectAll(".skill-value")
	  	.data(data)
	  	.enter().append("text")
	    .attr("class", "skill-value")
      .attr("x", width - 10)
      .attr("y", function(d, i) { return y(i) + barHeight / 2; })
      .attr("dy", "0.3em")
      .style("text-anchor", "end")
      .text(function(d) { return d.level + "%"; });

    skillsTransition = function(data) {
    	dataBars
    	.data(data)
    	.transition()
      .duration(1000)
      .attr("width", function(d) { return x(d.level); });
    };

	};

	var scrollTrigger = function(e) {
	  if(triggerSkillsGraph && window.pageYOffset > 1200) {
	  	skillsTransition(skillsData);
	  	triggerSkillsGraph = false;
	  }
	};

	return {
		drawSkills: drawSkills,
		scrollTrigger: scrollTrigger
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
		    window.onscroll = CHARTS.scrollTrigger;
		  },
			error: function (error) {
				console.log(error);
		  }
		});

	};

})();