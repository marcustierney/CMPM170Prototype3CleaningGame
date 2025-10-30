let gameTimer = 60; 
let score = 0;
let gameOver = false;
let moldSpots = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  if (!gameOver) {
    if (frameCount % 60 == 0 && gameTimer > 0) {
      gameTimer--;
    }
    if (gameTimer <= 0) {
      gameOver = true;
    }
    fill(100, 200, 100);
      noStroke();
    for (let m of moldSpots) {
        circle(m.x, m.y, m.r * 2);
    }
    if (frameCount % 120 == 0) { //mold spreads every two seconds 
      spreadMold();
    }
    drawTimer();


  } else {
    //done
  }
}

function drawTimer() {
  fill(0);
  textSize(20);
  text(`Time Left: ${gameTimer}s`, 20, 30);
}

function spreadMold() {
    newMold = {
        x: random(width),
        y: random(height),
        r: random(15, 40)
    }
    moldSpots.push(newMold);
}
