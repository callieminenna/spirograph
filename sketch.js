// Animation state
let hue = 0; // Current color hue for rainbow effect (0-360)
let angle = 0; // Current angle parameter for spirograph calculation
let currentPoint, nextPoint; // Line endpoints for drawing spirograph segments

// Canvas dimensions
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// Spirograph parameters (defaults)
let outerRadius = 224; // Radius of the fixed outer circle
let innerRadius = 28; // Radius of the rolling inner circle
let penDistance = 93; // Distance from inner circle center to pen point
let slider_outerRadius, slider_innerRadius, slider_penDistance;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(255);
  colorMode(HSB);

  // Create control sliders for spirograph parameters
  slider_outerRadius = createSlider(10, 400, outerRadius)
  .position(10, 5)
  .style("width", "400px");
  slider_innerRadius = createSlider(10, 400, innerRadius)
  .position(10, 25)
  .style("width", "400px");
  slider_penDistance = createSlider(10, 200, penDistance)
  .position(10, 45)
  .style("width", "400px");

  // Calculate initial pen position using parametric spirograph equations
  currentPoint = [
    canvasWidth/2 + (outerRadius - innerRadius) * cos(angle) + penDistance * cos(angle * (1 - innerRadius / outerRadius)),
    canvasHeight/2 + (outerRadius - innerRadius) * sin(angle) - penDistance * sin(angle * (1 - innerRadius / outerRadius)),
  ];
  nextPoint = null;
}

function draw() {
  // Update slider UI area
  fill(255);
  noStroke();
  rect(0, 0, 450, 90); // White background for sliders

  // Read slider values
  outerRadius = slider_outerRadius.value();
  innerRadius = slider_innerRadius.value();
  penDistance = slider_penDistance.value();

  // Display current slider values
  textSize(15);
  fill(0);
  text(outerRadius, 420, 20);
  text(innerRadius, 420, 40);
  text(penDistance, 420, 60);

  // Draw spirograph curve
  noFill();
  strokeWeight(2);

  // Increment angle for next point calculation
  angle += PI / 20;

  // Calculate next pen position using parametric spirograph equations
  // x = (R - r) * cos(t) + p * cos(t * (1 - r/R))
  // y = (R - r) * sin(t) - p * sin(t * (1 - r/R))
  nextPoint = [
    canvasWidth/2 + (outerRadius - innerRadius) * cos(angle) + penDistance * cos(angle * (1 - innerRadius / outerRadius)),
    canvasHeight/2 + (outerRadius - innerRadius) * sin(angle) - penDistance * sin(angle * (1 - innerRadius / outerRadius)),
  ];

  // Draw line segment with cycling rainbow color
  stroke(hue, 255, 80);
  hue += 1;
  if (hue >= 360) hue = 0;

  line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
  currentPoint = nextPoint;
}

// Clear canvas on mouse release
function mouseReleased() {
  background(255);
}

// Handle window resize
window.onresize = function () {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.size(canvasWidth, canvasHeight);
};