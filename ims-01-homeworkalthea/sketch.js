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
var w = 1400;
var h = 1000;

//scl = size of each grid square
//w, h = total terrain size
//cols, rows = how many grid points building 70*50 grids

var flying = 0;
//It makes the terrain move over time
var terrain = [];
//terrain[x][y] = height value

function setup() {
  createCanvas(600, 600, WEBGL);
  //Enables 3D mode
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
      //initializing every point with height = 0
    }
  }
}

function draw() {

  flying -= 0.1;
  var yoff = flying;
  //draw a rectangular grid
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);//height and density
      xoff += 0.2;//control smoothness of terrain
    }
    //returns smooth values between 0–1
    yoff += 0.2;
  }


  background(0);
  translate(0, 50);
  rotateX(PI / 3); //gives 3D perspective
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}