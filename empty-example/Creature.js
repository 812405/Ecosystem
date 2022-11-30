class Creature extends Vehicle {
    constructor(vehicle, energy) {
        super(vehicle[0], vehicle[1], vehicle[2], vehicle[3], vehicle[4], vehicle[5], vehicle[6], vehicle[7], vehicle[8], vehicle[9])
        this.energy = energy;
        this.de = 0
    }
}