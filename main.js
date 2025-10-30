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
    cleaning();
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

function cleaning() {
  if (mouseIsPressed) {
    for (let i = 0; i < moldSpots.length; i++) {
      let current = moldSpots[i];
      let d = dist(mouseX, mouseY, current.x, current.y); //calculate distance between mouse and mold center
      if (d < current.r) { //mouse is over mold
        if (heldMoldIndex !== i) { //set current mold being held 
          heldMoldIndex = i;
          holdStartTime = millis();
        } else {
          let heldTime = (millis() - holdStartTime) / 1000;
          if (heldTime >= 1.5) { //remove mold after 1.5 seconds of holding
            moldSpots.splice(i, 1);
            score++;
            heldMoldIndex = -1;
            holdStartTime = null;
          }
        }
        return; 
      }
    }
  } else {//mouse released
    heldMoldIndex = -1;
    holdStartTime = null;
  }
}