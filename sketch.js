let R, r, rr, currentPoint; // point positions
let hue;
let center = 300;

function setup() {
    createCanvas(600, 600);
    background(255);
    colorMode(HSB);
    R = int(random(100, 200));
    r = int(random(20, 100));
    rr = int(random(2, 200));
    hue = 0;
    i = 0;

    currentPoint = [
        center + (R - r) * cos(i) + rr * cos(i * (1 - r / R)),
        center + (R - r) * sin(i) - rr * sin(i * (1 - r / R))
    ];
}

function draw() {
    i += PI / 20;
    nextPoint = [
        center + (R - r) * cos(i) + rr * cos(i * (1 - r / R)),
        center + (R - r) * sin(i) - rr * sin(i * (1 - r / R))
    ];
    stroke(hue, 255, 80);
    hue += 1;
    if (hue > 255) hue = 0;
    line(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
    currentPoint = nextPoint;
}

function mouseClicked() {
    setup();
}