let recMode = false;
let can;

let crazyTriangle;
let bounceCircles;
let sineWaveBoids;
let quickSort;

function setup() {
  background(2, 1, 84, 128)
  const main = document.getElementById('p5-background');
  const rect = main.getBoundingClientRect();

  // create canvas sized to <main> rather than the window
  can = createCanvas(rect.width, rect.height);
  can.parent('p5-background');

  // Make it act like a background layer inside <main>
  can.style('position', 'absolute');
  can.style('top', '0');
  can.style('left', '0');
  can.style('z-index', '0');
  can.style('pointer-events', 'none');

  frameRate(10);

  // your existing sketch setup stays the same
  crazyTriangle = new Array(40);
  for (let i = 0; i < crazyTriangle.length; i++) {
    crazyTriangle[i] = new cvTriMotion(
      10,                    // num
      100,                   // range
      color(150),            // stroke color
      [random(255), random(255), random(255)],   // fill color
      random(10, 50)         // opacity
    );
  }
}

function draw() {
  background(2, 1, 84, .9); //change background color if change main!!!

  
  // Update and display all triangles
  for (let i = 0; i < crazyTriangle.length; i++) {
      crazyTriangle[i].display();
      crazyTriangle[i].update();
  }
  recordit();
}



function recordit() {  // new version
  if (recMode == true) {
      let ext = nf(frameCount,4);
      saveCanvas(can, 'frame-' + ext, 'jpg');
      console.log("rec " + ext);
  }
}

function windowResized() {
  const main = document.getElementById('p5-background');
  const rect = main.getBoundingClientRect();
  resizeCanvas(rect.width, rect.height);
}