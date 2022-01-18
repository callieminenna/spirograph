let hue = 0, i = 0;
let currentPoint, nextPoint;

var w = window.innerWidth;
var h = window.innerHeight;  

// Sliders defaults
let R = 224; // R: base radius
let r = 28; // r: second radius
let p = 93; // p: length of the pen
let slider_R, slider_r, slider_p;

function setup() {
  canvas = createCanvas(w, h);
  background(255);
  colorMode(HSB);
  slider_R = createSlider(10, 400, R)
    .position(10, 5)
    .style("width", "400px");
  slider_r = createSlider(10, 400, r)
    .position(10, 25)
    .style("width", "400px");
  slider_p = createSlider(10, 200, p)
    .position(10, 45)
    .style("width", "400px");

  currentPoint = [
    w/2 + (R - r) * cos(i) + p * cos(i * (1 - r / R)),
    h/2 + (R - r) * sin(i) - p * sin(i * (1 - r / R)),
  ];
  nextPoint = null;
}

function draw() {
  //////////////////////// The sliders
  fill(255);
  noStroke();
  rect(0, 0, 450, 90);
  R = slider_R.value();
  r = slider_r.value();
  p = slider_p.value();
  textSize(15);
  fill(0);
  text(R, 420, 20);
  text(r, 420, 40);
  text(p, 420, 60);

  //////////////////////// The spirograph
  noFill();
  strokeWeight(2);

  i += PI / 20;
  nextPoint = [
    w/2 + (R - r) * cos(i) + p * cos(i * (1 - r / R)),
    h/2 + (R - r) * sin(i) - p * sin(i * (1 - r / R)),
  ];
  stroke(hue, 255, 80);
  hue += 1;
  if (hue >= 360) hue = 0;
  line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  currentPoint = nextPoint;
}

function mouseReleased() {
  background(255);
}

window.onresize = function () {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w, h);
};

