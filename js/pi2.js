const svg2 = d3.select('#hotDog');

const stick_length = 50;
const line = d3.line();

function setUp() {
    let height = +svg2.attr('height');
    let width = +svg2.attr('width');

    for (let i = 0; i <= height; i += stick_length) {
        let pts = [[0, i], [width, i]];
        let path = line(pts);

        svg2.append('path')
        .attr('d', path)
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5);
    }
}

function getAngle() {
    let X, Y, R;
    do {
        X = 2 * (1 - Math.random()) - 1;
        Y = 2 * (1 - Math.random()) - 1; // take 1 - Math.random() to avoid edge case of division by zero
        // sample random point in square, throw it away if not in unit disk
        R = Math.sqrt(X**2 + Y**2);
    } while (R >= 1) // make sure W < 1

    return [X/R, Y/R]; // returns a random point on the unit circle
}

function evaluateCrossing(stick) {
    let y1 = stick[0][1];
    let y2 = stick[1][1];

    return +(Math.floor(y1/stick_length) != Math.floor(y2/stick_length)); 
    // if between the two y coords of the points there is a multiple of 50, then the stick crosses one of the lines
}

setUp();

var num_sticks = 5;
var crossing = 0;

var sticks = []

function updateSticks(toAdd) {
    if (toAdd >= 0) {
        for (let i = 0; i < toAdd; i++) {
            let x1 = width * Math.random();
            let y1 = height * Math.random();
            let theta = getAngle();
            let x2 = x1 + stick_length * theta[0];
            let y2 = y1 + stick_length * theta[1];
            let new_stick = [[x1, y1], [x2, y2]];
            sticks.push(new_stick);
            crossing += evaluateCrossing(new_stick);
        }    

    } else {
        for (let i = 0; i < -1 * toAdd; i++) {
            crossing -= evaluateCrossing(sticks.shift());
        }
    }
    
    svg2.selectAll('.stick').remove();

    svg2.selectAll('.stick')
    .data(sticks)
    .enter()
    .append('path')
    .attr('class', 'stick')
    .attr('d', d => line(d))
    .attr('fill', 'none')
    .attr('stroke', '#ed7745')
    .attr('stroke-width', 1.5)


    $('#crossingSticks').html(crossing);
    $('#recip').html(num_sticks + "/" + crossing + " = " + (num_sticks / crossing));
    $('#piDog').html(2 * num_sticks + "/" + crossing + " = " + (2 * num_sticks / crossing));
}

updateSticks(num_sticks);

$('#slider2').on('input', function() {
    var old_sticks = num_sticks
    num_sticks = 5 * document.getElementById("slider2").value;
    $("#numsticks").html(num_sticks);

    updateSticks(num_sticks - old_sticks);
});