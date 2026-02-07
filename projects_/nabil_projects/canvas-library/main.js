var cellWidth = window.innerWidth / 10.5;

var col = 10;
var row = 15;
var lineWidth = 1;

var w = cellWidth * col;
var h = cellWidth * row;
var cellCont = col * row;
var fontSize = cellWidth / 2;
cvs.width = w;
cvs.height = h;
cvs.style.background = "#16a085";

// Draw Cells
function DrawCells() {
  for (var i = 0; i < row + 1; i++) {
    Line(0, i * cellWidth, w, i * cellWidth, lineWidth, "#ecf0f1");
  }
  for (var i = 0; i < col + 1; i++) {
    Line(i * cellWidth, 0, i * cellWidth, h, lineWidth, "#ecf0f1");
  }
}

// Draw Cells Numbers
function DrawNum() {
  var cellNum = 0;
  var onOff = true;
  for (var i = row - 1; i > -1; i--) {
    if (onOff)
      for (var j = 0; j < col; j++) {
        Text(cellNum, j * cellWidth, i * cellWidth, "black", fontSize);
        cellNum++;
        onOff = false;
      }
    else
      for (var j = col - 1; j > -1; j--) {
        Text(cellNum, j * cellWidth, i * cellWidth, "black", fontSize);
        cellNum++;
        onOff = true;
      }
  }
}

// Create Player
class Player {
  constructor(cellWidth, circleWidth, height, col, background, borderColor) {
    this.cellWidth = cellWidth;
    this.circleWidth = circleWidth;
    this.x = circleWidth / 2 + 3;
    this.y = height - circleWidth / 2 - 3;
    this.col = col;
    this.steps = 0;
    this.mirorr = false;
    this.background = background;
    this.borderColor = borderColor;
  }
  Move(Add_Steps) {
    for (let i = 0; i < Add_Steps; i++) {
      setTimeout(() => {
        if (this.steps < this.col - 1) {
          if (!this.mirorr) {
            for (let j = 0; j < this.cellWidth; j++) {
              setTimeout(() => {
                this.x++;
              }, j * 2);
            }
            // this.x += this.cellWidth;
          } else {
            for (let j = 0; j < this.cellWidth; j++) {
              setTimeout(() => {
                this.x--;
              }, j * 2);
            }
            //this.x -= this.cellWidth;
          }
          var sound1 = new Audio("sounds/sound1.mp3");
          sound1.play();
        }

        if (this.steps == this.col - 1) {
          for (let j = 0; j < this.cellWidth; j++) {
            setTimeout(() => {
              this.y--;
            }, j * 2);
          }
          this.steps = -1;
          if (this.mirorr) this.mirorr = false;
          else this.mirorr = true;
          var sound1 = new Audio("sounds/sound2.mp3");
          sound1.play();
        }
        this.steps++;
      }, i * 200);
    }
  }
  Draw() {
    Circle(this.x, this.y, this.circleWidth, this.background, this.borderColor);
  }
}

var RedPly = new Player(
  cellWidth,
  cellWidth * 0.4,
  h,
  col,
  "rgba(255, 0, 0, 1)",
  "white"
);

// Update
setInterval(function () {
  ctx.clearRect(0, 0, w, h);
  DrawCells();
  DrawNum();
  RedPly.Draw();
}, 1000 / 24);

// Random Button
var rand_btn = document.getElementById("rand-btn");
rand_btn.onclick = function () {
  var rand = Random(1, 7);
  rand_btn.textContent = rand;

  RedPly.Move(rand);
};

var move_btn = document.getElementById("move-btn");
move_btn.onclick = function () {
  RedPly.Move(1);
};
