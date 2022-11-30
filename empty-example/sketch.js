let vehicle;
let creature;
function setup() {
    var cnv = createCanvas(830, 630);
    vehicle = [createVector(250, 250), 5, 5, PI/12, 2, color(50, 50, 50), 1, 1000, 1000, 500];
    creature = new Creature(vehicle, 50);
    console.log(creature);
}

function draw() {
    background(255, 255, 255, 255);
    
}
