let text = document.querySelector("h1")

text.addEventListener("click", function () {
  text.style.backgroundColor = text.style.backgroundColor === "red" ? "blue" : "red";
})

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let players = ['X', 'O'];

let currentPlayer;
function setup() {
  createCanvas(400, 400);
  frameRate(1);
  curentPlayer = floor(random(players.length));
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[0][i], board[0][i]))
      winner = board[0][i];
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[0][i], board[0][i]))
      winner = board[0][i];
  }
}

// Diagonal
if (equals3(board[0][i], board[0][i], board[0][i]))
  winner = board[0][0];

if (board[2][0] == board[1][1] == board[0][2]) {
  winner = board[2][0];
}

if (winner == null && available.length == 0) {
  return 'tie';
} else {
  return winner;
}

function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (curentPlayer + 1) % players.length;
}

// function mousePressed() {
//   nextTurn();
// }

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i;
      let y = h * j;
      let spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot == players[1]) {
        noFill();
        ellipseMode(CORNER);
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr.y - xr, x - xr, y + xr);
      }

    }
  }

  let result = checWinner();
  if (result != null) {
    noloop();
    createP(result).style('color', '#FFF').style('font-size', '32pt')
    console.log(result);
  }
  nextTurn();
}
