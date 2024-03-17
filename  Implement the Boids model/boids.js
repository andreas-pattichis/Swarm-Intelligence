// Define the main simulation environment and its parameters
let alignment_strength = 1; // Alignment parameter, directly used in code
let cohesion_strength = 100; // Cohesion parameter, indirectly used in code
let separation_strength = 20; // Separation parameter, directly used in code
let boid_speed = 4; // Boid speed parameter, directly used in code
let neighbour_radius = 100; // Neighbor detection radius, directly used in code

let Scene = {
    w: 600, h: 600, swarm: [],
    // Method to find neighbours within a radius for a given boid
    neighbours(x) {
        let r = [];
        for (let p of this.swarm) {
            if (dist(p.pos.x, p.pos.y, x.x, x.y) <= neighbour_radius) {
                r.push(p);
            }
        }
        return r;
    }
};

// Particle class to represent each boid in the swarm
class Particle {
    constructor() {
        // Initial position and direction
        this.pos = createVector(random(0, Scene.w), random(0, Scene.h));
        this.dir = p5.Vector.random2D();
    }

    // Boundary handling to wrap around the edges
    wrap() {
        if (this.pos.x < 0) this.pos.x += Scene.w;
        if (this.pos.y < 0) this.pos.y += Scene.h;
        if (this.pos.x > Scene.w) this.pos.x -= Scene.w;
        if (this.pos.y > Scene.h) this.pos.y -= Scene.h;
    }

    // Draw the particle on the canvas
    draw() {
        fill(0);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }

    // Update the state of the particle based on the boids algorithm
    step() {
        let N = Scene.neighbours(this.pos),
            avg_sin = 0, avg_cos = 0,
            avg_p = createVector(0, 0),
            avg_d = createVector(0, 0);

        // Calculate the average position and direction, along with separation
        for (let n of N) {
            avg_p.add(n.pos);
            if (n != this) {
                let away = p5.Vector.sub(this.pos, n.pos);
                away.div(away.magSq());
                avg_d.add(away);
            }
            avg_sin += Math.sin(n.dir.heading()) / N.length;
            avg_cos += Math.cos(n.dir.heading()) / N.length;
        }

        avg_p.div(N.length);
        avg_d.div(N.length);

        let avg_angle = Math.atan2(avg_cos, avg_sin);
        avg_angle += Math.random() * 0.5 - 0.25;
        avg_angle *= alignment_strength;
        this.dir = p5.Vector.fromAngle(avg_angle); // Update direction based on alignment

        let cohesion = p5.Vector.sub(avg_p, this.pos);
        cohesion.div(cohesion_strength); // Apply cohesion strength
        this.dir.add(cohesion); // Add cohesion

        avg_d.mult(separation_strength); // Apply separation strength correctly
        this.dir.add(avg_d); // Add separation

        this.dir.setMag(boid_speed); // Keep speed constant but update direction
        this.pos.add(this.dir); // Move the boid
        this.wrap(); // Handle boundary conditions
    }
}

// Setup the canvas and initialize the swarm
function setup() {
    createCanvas(Scene.w, Scene.h);
    for (let _ of Array(15)) {
        Scene.swarm.push(new Particle());
    }
}


function computeNorm(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

function compute_0(array){
  let vector_suma = array[0].div(computeNorm(array[0]))
  for (let i = 1; i < array.length; i++){
    vector_suma.add(array[i].div(computeNorm(array[i])))
  }
  vector_suma = 1/array.length * computeNorm(vector_suma)
  return vector_suma
}

function compute_distances(object){
  let N = Scene.neighbours( object.pos )
  let best_distance = 100000000
  for (let n of N ){
    let distance = dist(object.pos.x, object.pos.y, n.pos.x, n.pos.y)
    if (n != object && distance < best_distance){
      best_distance = distance
    }
  }
  return best_distance
}



let timesteps = 0;
let order_parameters = [];
let neighbour_distances = [];

// Main draw loop
function draw() {
    if (timesteps < 300) {
        let step_boids = [];
        background(220);
        let neighbour_distances_step = [];
        for (let p of Scene.swarm) {
            p.step();
            step_boids.push(p.dir);
            neighbour_distances_step.push(compute_distances(p));
            p.draw();
        }
        neighbour_distances.push(neighbour_distances_step);
        order_parameters.push(compute_0(step_boids));
        timesteps++;
    } else if (timesteps == 300) { // Final analysis and logging
        console.log("Order Parameters Over Time:", order_parameters);
        let avgNeighbourDistances = neighbour_distances.map(distances => {
            return distances.reduce((acc, val) => acc + val, 0) / distances.length;
        });
        console.log("Average Nearest-Neighbor Distance Over Time:", avgNeighbourDistances);
        timesteps++; // Prevent further logging
    }
}