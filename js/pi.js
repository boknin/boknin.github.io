var svg1 = d3.select("#qCirc");
var width = +svg1.attr("width");
var height = +svg1.attr("height");
var radius = +svg1.attr("height");

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2);

svg1.append("path")
    .attr("d", arc)
    .attr("transform", `translate(0, ${height})`)
    .attr("fill", "#bdbdbd");

var number_points = 10;
var points_inside_circle = 0;
points = [];

function evaluateInsideCircle(point) {
    return +(Math.sqrt(
        (point.x ** 2) + 
        ((1 - point.y) ** 2)
    ) <= 1);
}

function updatePoints(toAdd) {
    if (toAdd >= 0) {
        for (let i = 0; i < toAdd; i++) {
            var new_point = {x: Math.random(), y: Math.random()};
            points.push(new_point);
            points_inside_circle += evaluateInsideCircle(new_point);
        }
    } else {
        for (let i = 0; i < -1 * toAdd; i++) {
            points_inside_circle -= evaluateInsideCircle(points.shift());
        }
    }

    svg1.selectAll("circle").remove()

    svg1.selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", d => width * d.x)
    .attr("cy", d => height * d.y)
    .attr("r", 1);

    $('#insideCircle').html(points_inside_circle);
    $('#quotient').html(points_inside_circle + "/" + number_points + " = " + (points_inside_circle / number_points));
    $('#approx').html(4 * points_inside_circle + "/" + number_points + " = " + (4 * points_inside_circle / number_points));

}

updatePoints(number_points)

$('#slider').on('input', function() {
    var old_points = number_points;
    number_points = 10 * document.getElementById("slider").value;
    $("#numpts").html(number_points);

    updatePoints(number_points - old_points);
});