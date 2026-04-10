//original link：https://editor.p5js.org/codingtrain/sketches/OPYPc4ueq
// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

// Edited by SacrificeProductions
//Use size of each grid square
//use noise() 3d rendering
//Uses grid + vertices build a surface
var cols, rows;
var scl = 20;

var w, h;

var flying = 0;
var terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  w = windowWidth;
  h = windowHeight;

  cols = floor(w / scl);
  rows = floor(h / scl);

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  flying -= 0.1;
  let yoff = flying;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);

  translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  fill(200, 200, 200, 150);
  stroke(0);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}