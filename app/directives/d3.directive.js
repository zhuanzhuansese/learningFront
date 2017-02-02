angular.module('myApp').directive('d3Demo',function(){
var width = 960,
    height = 800;
var nodes = [],
	links = [],
	n = 11,
	fill = d3.scale.category10(),
	size = [10,20,30,40,50,50,50,50,50,50,50],
	foci = [
	{x: 400, y: 700},
	{x: 150, y: 600},
	{x: 650, y: 600},
	{x: 150, y: 500},
	{x: 650, y: 500},
	{x: 150, y: 400},
	{x: 650, y: 400},
	{x: 150, y: 300},
	{x: 650, y: 300},
	{x: 150, y: 200},
	{x: 650, y: 200},
	];

for (var i = 0;i < n; i++){
	var node = {
		label1 : "LABEL1 "+i,
		label2 : "LABEL2 "+i,
		data : Math.random()*15
	};
	nodes.push(node);
};

links.push(
	{
		source : 0,
		target : 1,
		utility : "y"
	});
links.push(
	{
		source : 0,
		target : 2,
		utility : "y"
	});

for (i = 1; i < nodes.length-2; i++){
	j = Math.floor((i-1)/2)+1;
	
		links.push(
	{
		source : i,
		target : j*2+1,
		utility : "y"
	});
	links.push(
	{
		source : i,
		target : j*2+2,
		utility : "n"
	})
	
	

};

var force=d3.layout.force()			.size([width,height]).nodes(nodes).links(links).linkDistance(100).linkStrength(0.01).gravity(0).on("tick",tick);
force.start();

var svg = d3.select("body").append("svg:svg").attr("width",width).attr("height",height);
svg.style("opacity",1e-6).transition().duration(1000).style("opacity",1);
var link=svg.selectAll("g.link").data(links).enter().append("svg:line").attr("class","link").style("stroke","#CCC").style("stroke-width",3).style("opacity",.8);
var path=svg.selectAll("g.path").data(force.links()).enter().append("svg:path").attr("class","path").style("stroke",function(d,i){if (d.utility==="y"){return "#2E86D1"}else{return "#CCC"}}).style("stroke-dasharray","9 10").style("stroke-width","5");            
var node = svg.selectAll("g.node").data(force.nodes()).enter().append("svg:g").on("mouseover",mouseover).on("mouseout",mouseout);
var ellipse=node.append("svg:ellipse")//.attr("cx",function(d,i){return d.x}).attr("cy",function(d,i){return d.y})
				   .attr("rx",function(d,i){return d.data*2}).attr("ry",function(d,i){return d.data})//function(d,i){return size[i]})
				   .attr("class","ellipse")
                   .style("fill",function(d,i){return fill(i &3)})
                   .style("stroke",function(d,i){return d3.rgb(fill(i&3)).darker(2);})
                   .style("stroke-width",1)
                   .style("cursor","pointer")
                   //.style("z-index",9)
                   .style("weight",1);

var div=node.append("XXX")//.attr("cx",function(d,i){return d.x}).attr("cy",function(d,i){return d.y})
				   //.attr("rx",function(d,i){return d.data*2}).attr("ry",function(d,i){return d.data})//function(d,i){return size[i]})
				   //.attr("class","ellipse")
				   .attr("height","120px")
				   .attr("width","80px")
				   //.style("left", d3.event.pageX + "px")
                  // .style("top", d3.event.pageY + 15 + "px")
				  // .attr("x",d3.event.pageX)
				   //.attr("y",d3.event.pageY)
                   .style("fill","red")
                   .style("margin","auto")
                   .style("stroke",function(d,i){return d3.rgb(fill(i&3)).darker(2);})
                   .style("stroke-width",1)
                   .text("abc")
                   //.style("cursor","pointer")
                   //.style("z-index",9)
                   .style("weight",1);
node.call(force.drag);



var tooltip=node.append("svg:text").attr("class","text").text(function(d,i){return d.label1}).style("font-family","Arial").style("font-size",20).style("visibility","hidden");
//.on('mouseover',function(d,i){return text.style("visibility","visible")})
//.on('mouseout',function(d,i){return text.style("visibility","hidden")});

var text=node.append("svg:text").attr("class","text").text(function(d,i){return d.label2}).style("fill","#e377c2").style("font-family","Arial").style("font-size",10).attr("text-anchor","middle");
//var mouseposition=d3.mouse(this);
//var x=mouseposition[0];
//var y=mouseposition[1];
//console.log(mouseposition[0]);
//console.log(selection.node());
function mouseover(){
	
	d3.select(this).select("text")//.transition()
		//.duration(750)
		.attr("visibility","visible");
	d3.select(this).select("ellipse").transition()
		.duration(750)
		.attr("rx",function(d,i){return d.data*4})

	//d3.select(this).select("ellipse").transition()
	//	.duration(750)
		.attr("ry",function(d,i){return d.data*2})
		;
}

function mouseout(){
	// console.log("reach")
	// that=d3.select(this);
	// console.log(that);
	d3.select(this).select("text")//.transition()
		//.duration(750)
		.style("visibility","hidden");
	d3.select(this).select("ellipse").transition()
		.duration(750)
		.attr("rx",function(d,i){return d.data*2})

		//d3.select(this).select("ellipse").transition()
		//.duration(750)
		//.attr("rx",20)
		.attr("ry",function(d,i){return d.data});
}
repeat();
function repeat(){
	path.attr("stroke-dashoffset","1000")
		.transition()
		.duration(6000)
		.ease("linear")
		.attr("stroke-dashoffset",0)
		.each("end",repeat)
};
function tick(e){
	var k=e.alpha;
	nodes.forEach(function(o,i){
		o.x+=(foci[i].x-o.x)*k;
		o.y+=(foci[i].y-o.y)*k;
	});

	ellipse.attr("cx",function(d){return d.x;})
	    .attr("cy",function(d){return d.y;});
	text.attr("x",function(d){return d.x;})
		.attr("y",function(d){return d.y;});
    div.attr("x",function(d){return d.x;})
		.attr("y",function(d){return d.y;});
	tooltip.attr("x",function(d){return d.x;})
		.attr("y",function(d){return d.y;});
	link.attr("x1",function(d){return d.source.x})
		.attr("x2",function(d){return d.target.x})
		.attr("y1",function(d){return d.source.y})
		.attr("y2",function(d){return d.target.y});
    force.resume();

    path.attr("d",function(d){
    	return "M"+
    	d.source.x+" "+
    	d.source.y+" L "+
    	d.target.x+" "+
    	d.target.y;
    })
	};
})

