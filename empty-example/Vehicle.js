class Vehicle {
    constructor(tPos, maxForce, maxSpeed, smoothTheta, scale, color, charisma, aDist, cDist, sDist) {
        this.tPos = tPos;//  location
        this.tVel = createVector(0,0);
        this.tAccel = createVector(0, 0);
        this.sum = createVector(0, 0);
        this.maxForce = maxForce;
        this.mass2d = scale ** 2;//  Math.pow(x, y) ?????
        this.maxSpeed = maxSpeed;
        this.smoothTheta = smoothTheta;//  smooth change in velocity
        this.scale = scale;
        this.color = color;
        this.charisma = charisma;//  det leadership scale
        this.d = 0;
        this.aDist = aDist;
        this.cDist = cDist;
        this.sDist = sDist;//  desired sep
    }
    updateVhc() {
        this.d = this.max
        this.tAccel.div(this.mass2d);
        this.tVel.add(this.tAccel);
        this.tVel.limit(this.maxSpeed);
        this.tAccel.x = 0;
        this.tAccel.y = 0;
        this.tPos.add(this.tVel);
    }
    applyForce(force) {
        this.tAccel.add(force);
    }
    seek(target) {
        let desiredVel = p5.Vector.sub(target, this.tPos);
        let force = p5.Vector.sub(desiredVel, this.tVel);
        return force;
    }

    arrive(target, range) {//  lerp
        let desiredVel = p5.Vector.sub(target, this.tPos);
        this.d = desiredVel.mag();
        desiredVel.normalize();
        if (this.d > range) {
            desiredVel.mult(this.maxSpeed);
        }
        else {
            desiredVel.mult(this.maxSpeed*this.d/range);
        }
        let force = p5.Vector.sub(desiredVel, this.tVel);
        return force;
    }

    flee(target, range) {
        let desiredVel = p5.Vector.sub(target, this.tPos);
        this.d = desiredVel.mag();
        if (this.d < range) {
            desiredVel.normalize();
            desiredVel.mult(-this.maxSpeed);
            return desiredVel
        }
        else {
            return createVector(0, 0);
        }
    }
    smoothWalk() {
        this.tAccel.rotate(random(-this.smoothTheta, this.smoothTheta));
    }
    render() {
        let x = this.tPos.x;
        let y = this.tPos.y;
        let dir = p5.Vector.normalize(this.tVel);
        let dir1 = p5.Vector.rotate(dir, 2*PI/3);
        let dir2 = p5.Vector.rotate(dir, -2*PI/3);
        dir.mult(2*this.scale);
        dir1.mult(this.scale);
        dir2.mult(this.scale);
        fill(this.color);
        triangle(x+dir.x, y+dir.y, x+dir1.x, y+dir1.y, x+dir2.x, y+dir2.y);
    }

    align(boids) {
        this.count = 0
        this.sum.x = 0;
        this.sum.y = 0;
        for (let i = 0; i < boids.length; i++) {
            this.d = p5.Vector.dist(this.tPos, boids[i].tPos);
            if ((this.d > 0) && (this.d < this.aDist)) {
                this.sum.add(p5.Vector.mult(boids[i].tVel, boids[i].charisma));
                this.count++;
            }
        }

        if (this.count > 0) {
            this.sum.div(this.count);
            let steer = p5.Vector.sub(this.sum, this.tVel);
            return steer;
        }
        else {
            return createVector(0,0);
        }
    }
    separate(boids) {
        this.sum.x = 0;
        this.sum.y = 0;
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            this.d = p5.Vector.dist(this.tPos, boids[i].tPos);
            if ((this.d > 0) && (this.d < this.sDist)) {
                let diff = p5.Vector.sub(this.tPos, boids[i].tPos);
                diff.normalize();
                diff.mult(this.sDist-this.d);
                this.sum.add(diff);
                count++;
            }
        }
        if (count > 0) {
            this.sum.div(this.count);
            let steer = p5.Vector.sub(this.sum, this.tVel);
            return steer;
        }
        else {
            return createVector(0, 0);
        }
    }
    cohesion(boids) {
        this.sum.x = 0;
        this.sum.y = 0;
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            this.d = p5.Vector.dist(this.tPos, boids[i].tPos);
            if ((this.d > 0) && (this.d < this.cDist)) {
            this.sum.add(p5.Vector.mult(boids[i].tPos, boids[i].charisma));
            count++;
          }
        }
        if (count > 0) {
            this.sum.div(count);
            let steer = this.seek(this.sum);
            return steer;
        }
        else {
            return createVector(0,0);
        }
    }
    hunt(boids, target, alg, coh, sep, sk) {
        this.applyForce(p5.Vector.mult(this.align(boids), alg));
        this.applyForce(p5.Vector.mult(this.cohesion(boids), coh));
        this.applyForce(p5.Vector.mult(this.separate(boids), sep));
        this.applyForce(p5.Vector.mult(this.seek(target), sk));
    }
}
