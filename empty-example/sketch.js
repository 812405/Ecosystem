let vehicles;
function setup() {
    var cnv = createCanvas(830, 630);
    vehicles = []
    for (let i=0; i<7; i++) {
        vehicles.push(new Vehicle(createVector(random(0, 500), random(0, 500)), 5, 5, PI/12, 5, color(50, 50, 50), 1, 500, 500, 200));
    }
}

function draw() {
    background(255, 255, 255, 255);
    for (let i=0; i<7; i++) {
        vehicles[i].hunt(vehicles, createVector(mouseX, mouseY), 1, 1, 1, 1);
        vehicles[i].updateVhc();
        vehicles[i].render();
    }
}
