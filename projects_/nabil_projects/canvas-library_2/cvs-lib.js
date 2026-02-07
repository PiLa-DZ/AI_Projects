// 1 -> Canvas(x, y, color);
// 2 -> Rect(x, y, width, height, color);
// 3 -> Circle(x, y, width, color);
// 4 -> Line(x1, y1, x2, y2, width, color);
// 5 -> Random(max, min);
// 6 -> Print(msg);
// 7 -> Text(text, x, y, color)

// 1 -> Canvas(x, y, color);
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
function Canvas(width, height, background) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.background = background;
  document.body.appendChild(canvas);
}

// 2 -> Rect(x, y, width, height, color);
function Rect(x, y, width, height, background) {
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.fillRect(x, y, width, height);
}

// 3 -> Circle(x, y, width, color);
function Circle(x, y, width, background, borderColor) {
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.strokeStyle = borderColor;
  ctx.arc(x, y, width / 2, 0, 360);
  ctx.fill();
  ctx.stroke();
}

// 4 -> Line(x1, y1, x2, y2, width, color);
function Line(x1, y1, x2, y2, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// 5 -> Random(max, min);
function Random(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 6 -> Print(msg);
function Print(msg) {
  console.log(msg);
}

// 7 -> Text(text, x, y, color)
function Text(text, x, y, color) {
  ctx.font = "20px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x + cellWidth / 2, y + cellWidth / 2);
}
