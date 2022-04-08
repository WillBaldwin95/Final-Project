// A template for my 'snake object'

class Snake {

    constructor() {                       
        this.body = [];                     //the snake body is an array, keeping track of all positions, namely front/'head' of the snake
        this.body[0] = createVector(floor(w/2), floor(h/2));  //create a snake in the centre
        this.xdir = 0;                      //position of snake of snake
        this.ydir = 0;
        this.len = 0;                       //length of the snake
    }

    setDir(x, y) {                            //direction the snake is moving
        this.xdir = x;
        this.ydir = y;
    }

    update() {                              // the value and position of the head of the snake
        let head = this.body[this.body.length-1].copy();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);
    }

    grow() {
        let head = this.body[this.body.length-1].copy();
        this.len++;
        this.body.push(head);
    }

    eat(pos) {                              // interaction between snake and food
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if (x == pos.x && y == pos.y) {
            this.grow();
            return true;
        }
        return false;
    }

    endGame() {
        let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
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