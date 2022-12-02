let creatures;
let vehicle;
function setup() {
    var cnv = createCanvas(830, 630);
    creatures = []
    for (let i=0; i<77; i++) {
        vehicle = [createVector(random(0, 500), random(0, 500)), 5, 5, PI/12, 5, color(50, 50, 50), 1, 500, 500, 500];
        creatures.push(new Creature(vehicle, 5));
    }
}

function draw() {
    background(255, 255, 255, 255);
    for (let i=0; i<  creatures.length; i++) {
        creatures[i].hunt(creatures, createVector(mouseX, mouseY), 1, 1, 1, 1);
        creatures[i].update();
        creatures[i].render();
    }
}
