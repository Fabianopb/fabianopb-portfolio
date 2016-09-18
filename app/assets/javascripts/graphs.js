var BARCHART = (function() {
	'use strict';

	var triggerSkillsGraph = true;
	var skillsData;
	var skillsTransition;

	var mouseOverEvent = function() {
		if(triggerSkillsGraph) {
			triggerSkillsGraph = false;
			skillsTransition(skillsData);
		}
	};
	
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
			.attr("transform", "translate(0," + marginTop + ")")
			.on("mouseover", mouseOverEvent);

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

	return {
		drawSkills: drawSkills
	};

})();

var SUNBURST = (function () {
	'use strict';

	var drawSunburst = function(data) {

		var width = 450,
	    height = 450,
	    radius = (Math.min(width, height) / 2) - 10;

		var x = d3.scale.linear().range([0, 2 * Math.PI]);

		var y = d3.scale.sqrt().range([0, radius]);

		var hslColors = [[240, 31, 25], [335, 84, 35], [21, 86, 69]];

		var partition = d3.layout.partition().value(function(d) { return d.size; });

		var arc = d3.svg.arc()
	    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
	    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
	    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

		var svg = d3.select(".sunburst-container").append("svg")
	    .attr("width", width)
	    .attr("height", height)
		  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

	  var updateGraphLegend = function(children) {

	  	d3.select(".legend-container").selectAll("*").remove();

	  	if(children) {
	  		var lineHeight = 40;
	  		var blockSide = 16;
	  		var legendHeight = Math.ceil(children.length / 3) * lineHeight;

		  	var legendSvg = d3.select(".legend-container").append("svg")
			    .attr("width", width)
			    .attr("height", legendHeight)
				  .append("g");

				var lineIndex = -1;
				legendSvg.selectAll("rect")
					.data(children)
	    		.enter().append("rect")
					.attr("width", blockSide)
					.attr("height", blockSide)
					.attr("x", function(d) {
						lineIndex++;
						lineIndex = lineIndex === 3 ? 0 : lineIndex;
						return lineIndex * width / 3;
					})
					.attr("y", function(d, i) { return Math.floor((i) / 3) * lineHeight; })
					.style("fill", function(d) { return d.color; });

				lineIndex = -1;
				legendSvg.selectAll(".legend-text")
			  	.data(children)
			  	.enter().append("text")
			    .attr("class", "legend-text")
		      .attr("x", function(d) {
						lineIndex++;
						lineIndex = lineIndex === 3 ? 0 : lineIndex;
						return (blockSide + 5) + lineIndex * width / 3;
					})
		      .attr("y", function(d, i) { return Math.floor((i) / 3) * lineHeight; })
		      .attr("dy", "1em")
		      .text(function(d) { return d.name; });
	  	}

	  };

	  var click = function(d) {
		  svg.transition()
	      .duration(750)
	      .tween("scale", function() {
	        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
		    })
		    .selectAll("path")
		    .attrTween("d", function(d) { return function() { return arc(d); }; });

		  updateGraphLegend(d.children);
		};

	 	var nodes = partition.nodes(data);

	 	var colorIndex = 0;
	 	for (var i = 0, w = nodes.length; i < w; i++) {
	 		if (nodes[i].depth === 0) {
	 			nodes[i].color = "transparent";
	 		}
	 		else if (nodes[i].depth === 1) {
	 			var hsl = hslColors[colorIndex];
	 			nodes[i].color = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
	 			for (var j = 0, z = nodes[i].children.length; j < z; j++) {
	 				var lighting = 30 + 60 * (j / (z - 1));
	 				nodes[i].children[j].color = "hsl(" + hsl[0] + "," + hsl[1] + "%," + lighting + "%)";
	 			}
	 			colorIndex++;
	 		}
	 	}

	  svg.selectAll("path")
      .data(nodes)
	    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return d.color; })
      .style("stroke", "#FFF")
      .on("click", click)
	    .append("title")
      .text(function(d) { return d.name; });

    updateGraphLegend(nodes[0].children);

	};

	return {
		drawSunburst: drawSunburst
	};

})();

var GETDATA = (function () {
	'use strict';

	window.onload = function() {

		$.ajax({
		  type: "GET",
		  contentType: "application/json; charset=utf-8",
		  url: 'data/get_data',
		  dataType: 'json',
		  data: "{}", 
		  success: function (data) {
		    BARCHART.drawSkills(data);
		  },
			error: function (error) {
				console.log(error);
		  }
		});

		$.ajax({
		  type: "GET",
		  contentType: "application/json; charset=utf-8",
		  url: 'data/sunburst',
		  dataType: 'json',
		  data: "{}", 
		  success: function (data) {
		    SUNBURST.drawSunburst(data);
		  },
			error: function (error) {
				console.log(error);
		  }
		});

	};

})();