window.SQUARE_SIZE = 25;
var SPEED = 75; // milliseconds delay between steps

var add_x = 0, add_y = 0;
var head = {x: 5, y: 5};
var boundaries = [];
var history = []; // places the snake's head has been
var snakeLength = 0;
var forbidden = [];
var fruit = {};
 

function reset() {
  // reset the board and snake variables
  add_x = 0;
  add_y = 0;
  head = {x: 5, y: 5};
  history = [];
  snakeLength = 0;
  fruit = {};

  clearField();
  makeFruit();
  window.loop = setInterval(step, SPEED);

}

function initializeSnake(w, h){
  // initialize the canvas and grid, with the width and height as parameters
  window.canvas = document.getElementById('snakeBoard');

  canvas.width = w;
  canvas.height = h;

  window.grid_width = Math.floor(canvas.width / SQUARE_SIZE); 
  window.grid_height = Math.floor(canvas.height / SQUARE_SIZE);
  
  if (canvas.getContext){
    window.ctx = canvas.getContext('2d');
    // drawGrid(SQUARE_SIZE); // For dev purposes
    makeBorder();
    makeFruit();
    window.loop = setInterval(step, SPEED);
  }
}

function step() {
  // function called by setInterval()
  head.x += add_x;
  head.y += add_y;
  var body = snakeLength > 0 ? history.slice(-snakeLength) : [];
  window.forbidden = boundaries.concat(body);

  for (var i = 0; i < forbidden.length; i++) {
    if (forbidden[i].x == head.x && forbidden[i].y == head.y) {

      gameOver();
    }
    if (fruit.x == head.x && fruit.y == head.y) {
      console.log(++snakeLength);
      makeFruit();
    }
  }
  updateSnake(body);

}

function makeFruit() {
  // generate random coordinates and put a fruit on the grid
  // grid_height grid_width
  var rand_x = Math.round(Math.random() * grid_width - 1);
  var rand_y = Math.round(Math.random() * grid_height - 1);

  while (rand_x <= 0 || rand_x >= grid_width - 1) {
    rand_x = Math.round(Math.random() * grid_width - 1);
  }
  while (rand_y <= 0 || rand_y >= grid_height - 1) {
    rand_y = Math.round(Math.random() * grid_height - 1);
  }

  fruit.x = rand_x;
  fruit.y = rand_y;

  console.log(rand_x + "," + rand_y);

}
function gameOver() {
  clearInterval(loop);
  var r = confirm("Nice Try! you got " + snakeLength + " fruits!\n\nHit OK to reset the game.");
  if (r) 
    reset();
}

function updateSnake(body) {
  clearField();
  for (var i = 0; i < body.length; i++) {
    fillSquare(body[i].x, body[i].y, true, "rgb(0, 100, 500)");
  };
  fillSquare(head.x, head.y, true, "rgb(0, 100, 500)");
  history.push({x: head.x, y: head.y});

}

function clearField() {
  // reset all blocks to white except for the boundaries
  for (var x = 1; x < grid_width-1; x++) {
    for(var y = 1; y < grid_height-1; y++) {
      fillSquare(x,y,false);
    }
  }
  fillSquare(fruit.x, fruit.y, true, "rgb(1000, 0, 0)");
}

function fillSquare(x, y, fill, color) {
  // fill in a square on the grid based on its x and y coordinates
  if (fill) {
    ctx.fillStyle = color || "rgb(0,0,0)"
  } else {
    ctx.fillStyle = "rgb(1000, 1000, 1000)"
  }
  ctx.fillRect(x * SQUARE_SIZE + 1, y * SQUARE_SIZE + 1, SQUARE_SIZE - 2, SQUARE_SIZE - 2);

}

window.onkeydown = function(event) {
  // clockwise starting from left arrow 37-40
  if (event.which == 37 && add_x != 1) {
    // left
    add_x = -1;
    add_y = 0;
    event.preventDefault();
    event.returnValue = false;  
  } else if (event.which == 38 && add_y != 1) {
    // up
    add_x = 0;
    add_y = -1;
    event.preventDefault();
    event.returnValue = false;  
  } else if (event.which == 39 && add_x != -1) {
    // right
    add_x = 1;
    add_y = 0;
    event.preventDefault();
    event.returnValue = false;  
  } else if (event.which == 40 && add_y != -1) {
    // down
    add_x = 0;
    add_y = 1;
    event.preventDefault();
    event.returnValue = false;  
  }
}

function drawGrid(interval) {
  // draw a grid with the interval between lines in px
  ctx.beginPath();
  for (var x = interval; x < canvas.width; x=x+interval) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }

  for (var y = interval; y < canvas.height; y=y+interval) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.stroke(); 
}

function makeBorder() {
  // fill in the border blocks
  for (var i = 0; i < grid_width; i++) {
    fillSquare(i, 0, true);
    boundaries.push({x: i, y: 0});
    fillSquare(i, window.grid_height - 1, true);
    boundaries.push({x: i, y: window.grid_height - 1});
  }
  for (var i = 0; i < grid_height; i++) {
    fillSquare(0, i, true);
    boundaries.push({x: 0, y: i});
    fillSquare(window.grid_width - 1, i, true);
    boundaries.push({x: window.grid_width - 1, y: i});
  }
}