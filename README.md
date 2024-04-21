# Swarm Intelligence

## Introduction
This project investigates the optimization of the Boid model's parameters for target alignment in swarm simulations using the Sequential Approximate Bayesian Computation (ABC) algorithm.

## Repository Structure
- `/Implement the Boids model`: Contains the implementation of the Boids model in JavaScript, using p5.js for visualization.
- `/Evolve Boid parameters using sequential ABC`: Includes the implementation of the ABC algorithm for evolving the parameters of the Boid model.

## Project Overview
### Boid Model Implementation
- **Environment Setup**: Simulated in a 2D environment with initial settings for canvas size, boid count, and neighbor detection radius.
- **Flocking Rules**: Implemented alignment, cohesion, and separation to govern the boids' movements.
- **Quantitative Metrics**: Calculated the order parameter and nearest neighbor distance to quantify flock alignment and distribution.

### Parameter Evolution Using Sequential ABC
- **Objective**: Evolve the Boid model parameters to achieve specified alignment levels, assessing the results with the order parameter as a fitness measure.
- **Methodology**: Used a sequential approach to refine parameters across generations, decreasing the acceptance threshold to converge on optimal flocking behaviors.

## Results
- **Implementation Insights**: Adjustments in cohesion, separation, and alignment demonstrated significant impacts on the flock's behavior, optimizing for different target alignments.
- **Sequential ABC Outcomes**: Successfully refined parameter values through generations to achieve high alignment, detailed through generational histograms and quantitative summaries.

## Conclusions
- **Achievements**: Identified optimal parameter configurations for desired alignments, highlighting the relationship between parameter settings and flock behavior.
- **Insights**: Gained a deeper understanding of the dynamic interactions within a Boid-based system through visual and quantitative analysis.

## Visualizations and Simulation Results
- **Links to Visual Outputs**: Visual examples and simulation outputs are available [here](https://drive.google.com/drive/folders/1knIsjnus4Dq98KLWbn3Z3TUjVXLYtqe4?usp=sharing).
