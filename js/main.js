let recMode = false;
let can;

let crazyTriangle;
let bounceCircles;
let sineWaveBoids;
let quickSort;

function setup() {
  can = createCanvas(710, 400);
  frameRate(10);

  crazyTriangle = new Array(40);
  // Initialize the triangles with custom colors
  for (let i = 0; i < crazyTriangle.length; i++) {
    crazyTriangle[i] = new cvTriMotion(
      10,                    // num
      100,                   // range
      color(150),           // stroke color
      [random(255), random(255), random(255)],   // fill color (red only)
      random(10, 50)        // opacity
    );
  }
  
  // Initialize the particle system
  bounceCircles = new Array(15);
  for (let i = 0; i < bounceCircles.length; i++) {
    bounceCircles[i] = new cvFunkForces(10);
  }
  
  // Initialize the sine wave boids
  sineBoid = new Array(100);
  for (let i = 0; i < sineBoid.length; i++) {
    sineBoid[i] = new cvSineFlock(100, height/2);
  }

  // Initialize the quicksort visualization
  quickSort = new QuickSort();
  quickSort.initialize();
}

function draw() {
  background(15);

  // Display the quicksort visualization
  quickSort.display();
  
  if (frameCount < 50) {
    console.log("Act I");
    // Update and display all triangles
    for (let i = 0; i < crazyTriangle.length; i++) {
        crazyTriangle[i].display();
        crazyTriangle[i].update();
    }

  } else if (frameCount < 200) {
    console.log("Act TEST");
    for (let i = 0; i < bounceCircles.length; i++) {
      bounceCircles[i].update();
      bounceCircles[i].display();
    }
    fill(15);
    rect(0, 0, 710, 400);
    for (let i = 0; i < crazyTriangle.length; i++) {
      crazyTriangle[i].display();
      crazyTriangle[i].update();
    }
    
  } else if (frameCount < 500) {
    console.log("Act II");
    for (let i = 0; i < crazyTriangle.length; i++) {
      crazyTriangle[i].display();
      crazyTriangle[i].update();
    }
    // Update and display particle system
    for (let i = 0; i < bounceCircles.length; i++) {
      bounceCircles[i].update();
      bounceCircles[i].display();
    }
  } else {
    console.log("Act III");
     // Update and display sine wave boids
     let sincount = sin(frameCount * 0.1) * 50 + 200;
     for (let i = 0; i < sineBoid.length; i++) {
       sineBoid[i].update(sincount);
       sineBoid[i].display();
     }
    // Update and display particle system
    for (let i = 0; i < bounceCircles.length; i++) {
      bounceCircles[i].update();
      bounceCircles[i].display();
    }
  }
  recordit();
}

function keyPressed() {

  if (keyIsPressed === true) {
      let k = key;
      console.log("k is " + k);

      if (k == 's' || k == 'S') {
          console.log("Stopped Recording");
          recMode = false;
          noLoop();
      }

      if (k == ' ') {
          console.log("Start Recording");
          recMode = true;
          loop();
      }
  }
}

function recordit() {  // new version
  if (recMode == true) {
      let ext = nf(frameCount,4);
      saveCanvas(can, 'frame-' + ext, 'jpg');
      console.log("rec " + ext);
  }
}

// ------------------- Brownian Motion -------------------
class cvTriMotion {
    constructor(num, range, strokeColor = 255, fillColor = [255, 0, 0], opacity = 70) {
        this.num = num;
        this.range = range;
        this.ax = [];
        this.ay = [];
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.opacity = opacity;
        
        for (let i = 0; i < this.num; i++) {
          this.ax[i] = width / 2;
          this.ay[i] = height / 2;
        }
      }
      
      // Method to set new colors
      setColors(stroke, fill, opacity) {
        this.strokeColor = stroke;
        this.fillColor = fill;
        this.opacity = opacity;
      }
      
      display() {
        // Draw a line connecting the points
        for (let j = 1; j < this.num; j++) {
          let val = j / this.num * 204.0 + 51;
          // stroke(this.strokeColor);
          noStroke();
          fill(this.fillColor[0], this.fillColor[1], this.fillColor[2], this.opacity);
          triangle(this.ax[j - 1], this.ay[j - 1], this.ax[j], this.ay[j],this.ax[(j + 1) % this.num], this.ay[(j + 1) % this.num]);
        }
      }
  
      update() {
        // Shift all elements 1 place to the left
        for (let i = 1; i < this.num; i++) {
          this.ax[i - 1] = this.ax[i];
          this.ay[i - 1] = this.ay[i];
        }
        
        // Put a new value at the end of the array
        this.ax[this.num - 1] += random(-this.range, this.range);
        this.ay[this.num - 1] += random(-this.range, this.range);
        
        // Constrain all points to the screen
        this.ax[this.num - 1] = constrain(this.ax[this.num - 1], 0, width);
        this.ay[this.num - 1] = constrain(this.ay[this.num - 1], 0, height);
      }
    }
    