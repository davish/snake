var c = {
  gameover: function(num) {
    alert(num);
  },
  updateScore: function(num) {
    document.getElementById('score').innerHTML = num;
  }
}

function loaded() {
  window.board = new Snake('snakeBoard', 10, 75, c);
}
