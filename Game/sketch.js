let snake;
let rez = 10;
let food;
let w;
let h;
let screen = 0
let score = 0

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);  //using floor to ensure a whole number
  frameRate(10);            //to slow the animation down slightly
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {           //using arrow keys to change the direction of the snake
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  }

}
function draw() {
  if (screen == 0) {
    startScreen()
  } else if (screen == 1) {
    gameOn()
  } else if (screen == 2) {
    endScreen()
  }
}
function gameOn() {
  scale(rez);             //to increase the size of the snake
  text("score = " + score, 30, 20)
  fill(255);
  background(220);
  if (snake.eat(food)) {  //interact with 'food'
    foodLocation();
    score += 1
  }
  snake.update();         //update every frame
  snake.show();           //show the snake on the canvas

  if (snake.endGame()) {
    screen = 2
  }


  noStroke();             //otherwise stroke will be scaled too and hide the colour of the 'food'
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function startScreen() {
  background(96, 157, 255)
  fill(255)
  textAlign(CENTER);
  text('WELCOME TO SNAKE', width / 2, height / 2)
  text('click to start', width / 2, height / 2 + 20);
  reset();
}

function endScreen() {
  background(150)
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2)
  text("SCORE = " + score, width / 2, height / 2 + 20)
  text('click to play again', width / 2, height / 2 + 40);
}

function mousePressed() {
  if (screen == 0) {
    screen = 1
  } else if (screen == 2) {
    screen = 0
  }
}

function reset() {
  score = 0;
  snake.update();
  snake.show();
  snake.setDir(0,0);
}

class Snake {

  constructor() {
      this.body = [];                     //the snake body is an array, keeping track of all positions, namely front/'head' of the snake
      this.body[0] = createVector(floor(w / 2), floor(h / 2));  //create a snake in the centre
      this.xdir = 0;                      //position of snake of snake
      this.ydir = 0;
      this.len = 0;                       //length of the snake
  }

  setDir(x, y) {                            //direction the snake is moving
      this.xdir = x;
      this.ydir = y;
  }

  update() {                              // the value and position of the head of the snake
      let head = this.body[this.body.length - 1].copy();
      this.body.shift();
      head.x += this.xdir;
      head.y += this.ydir;
      this.body.push(head);
  }

  grow() {
      let head = this.body[this.body.length - 1].copy();
      this.len++;
      this.body.push(head);
  }

  eat(pos) {                              // interaction between snake and food
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x == pos.x && y == pos.y) {
          this.grow();
          return true;
      }
      return false;
  }

  endGame() {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
          return true;
      }
      for (let i = 0; i < this.body.length - 1; i++) {
          let part = this.body[i];
          if (part.x == x && part.y == y) {
              return true;
          }
      }
      return false;
  }

  show() {
      for (let i = 0; i < this.body.length; i++) {
          fill(0);
          noStroke();
          rect(this.body[i].x, this.body[i].y, 1, 1)
      }
  }
}