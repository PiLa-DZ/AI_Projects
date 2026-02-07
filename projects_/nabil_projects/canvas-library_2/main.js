var w = 400;
var h = 600;
var cellWidth = w / 10;
Canvas(w, h, "#16a085");

// Draw Cells
function DrawCells() {
  for (var i = 0; i < 16; i++) {
    Line(0, i * cellWidth, w, i * cellWidth, 2, "#ecf0f1");
  }
  for (var i = 0; i < 11; i++) {
    Line(i * cellWidth, 0, i * cellWidth, h, 2, "#ecf0f1");
  }
}

// Draw Cells Numbers
function DrawNum() {
  var cellNum = 0;
  var onOff = true;
  for (var i = 14; i > -1; i--) {
    if (onOff)
      for (var j = 0; j < 10; j++) {
        Text(cellNum, j * cellWidth, i * cellWidth, "black");
        cellNum++;
        onOff = false;
      }
    else
      for (var j = 9; j > -1; j--) {
        Text(cellNum, j * cellWidth, i * cellWidth, "black");
        cellNum++;
        onOff = true;
      }
  }
}

// Create Player
var Player_X = cellWidth / 2;
var Player_Y = h - cellWidth / 2;
var steps = 0;
var mirorr = false;

function Move(Add_Steps) {
  for (var i = 0; i < Add_Steps; i++) {
    if (steps < 9)
      if (!mirorr) {
        Player_X += cellWidth;
      } else {
        Player_X -= cellWidth;
      }

    if (steps == 9) {
      Player_Y -= cellWidth;
      steps = -1;
      if (mirorr) mirorr = false;
      else mirorr = true;
    }
    steps++;
  }
}

// Update
setInterval(function () {
  ctx.clearRect(0, 0, w, h);
  DrawCells();
  DrawNum();
  Circle(Player_X, Player_Y, cellWidth / 1.5, "rgba(25, 33, 23, .3)", "blue");
}, 1000 / 24);

// Random Button
var rand_btn = document.getElementById("rand-btn");
rand_btn.style.fontSize = "42px";
rand_btn.onclick = function () {
  var rand = Random(7, 1);
  rand_btn.textContent = rand;

  Move(rand);
};
