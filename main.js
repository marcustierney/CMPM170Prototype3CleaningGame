let gameTimer = 60; 
let score = 0;
let gameOver = false;
let moldSpots = [];
let heldMoldIndex = -1;
let heldTime = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let spread_chance = 8;

let bubbles = [];
var audio = new Audio('assets/scrub.wav')

function setup() {
  createCanvas(800, 600);
  growMold();
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
        fill(m.c,200,100);
        circle(m.x, m.y, m.r * 2);
    }
    if (frameCount % 120 == 0) { //mold spreads every two seconds 
      for (let mold of moldSpots){
        let i = floor(random(0,spread_chance));
        if(i == 0){
          console.log("SPREAD")
          spreadMold(mold);
        }
      }
    }
    for (let b of bubbles) {  // bubbles when cleaning
      fill(b.c, 255, 255);
      circle(b.x, b.y, b.r * 2);
    }
    if (frameCount % 300 == 0){
      growMold();
    }
    cleaning();
    drawTimer();
    drawScore();
    //console.log(moldSpots);

  } else {
    //done
  }
}

function drawTimer() {
  fill(0);
  textSize(20);
  text(`Time Left: ${gameTimer}s`, 20, 30);
}

function drawScore() {
  fill(0);
  textSize(20);
  text(`Score: ${score}`, 20, 60);
}

function spreadMold(cur_mold) {
  console.log(cur_mold)
    newMold = {
        x: cur_mold.x + random(-80,80),
        y: cur_mold.y + random(-80,80),
        r: random(25, 50),
        c: random(100,250)
    }
    moldSpots.push(newMold);
}

function growMold() {
    newMold = {
        x: random(width),
        y: random(height),
        r: random(25, 50),
        c: random(100,250)
    }
    moldSpots.push(newMold);
}

function newBubbles() {
    newBubble = {
      x: mouseX,
      y: mouseY,
      r: random(1, 10),
      c: random(0, 204)
    }
    bubbles.push(newBubble)
}

function cleaning() {
    if (!mouseIsPressed) {
        heldMoldIndex = -1;
        heldTime = 0;
        lastMouseX = 0;
        lastMouseY = 0;
        return;
    }
    let overMold = false;
    for (let i = 0; i < moldSpots.length; i++) {
        let current = moldSpots[i];
        let d = dist(mouseX, mouseY, current.x, current.y); //calculate distance between mouse and mold center
        if (d < current.r) { //mouse is over mold
            overMold = true;
            if (heldMoldIndex !== i) { //set current mold being held 
                heldMoldIndex = i;
                heldTime = 0;
                lastMouseX = mouseX; 
                lastMouseY = mouseY;

            } else {
                let movement = dist(mouseX, mouseY, lastMouseX, lastMouseY);
                newBubbles()
                audio.play();
                if (movement > 1) {
                    heldTime += deltaTime / 1000;
                    if (heldTime >= 1) { //remove mold after 1 second of holding
                        moldSpots.splice(i, 1);
                        bubbles = []; // clear bubbles
                        score++;
                        heldMoldIndex = -1;
                        lastMouseX = 0;
                        lastMouseY = 0;
                        heldTime = 0;
                        return;
                    }
                } 
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
            return; 
        }
    }
    if (!overMold) { //reset if not over any mold
        heldMoldIndex = -1;
        heldTime = 0;
        lastMouseX = 0;
        lastMouseY = 0;
    } 
}