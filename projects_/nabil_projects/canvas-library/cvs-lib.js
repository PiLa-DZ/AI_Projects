var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

function Rect(x, y, width, height, background) {
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.fillRect(x, y, width, height);
}

function Circle(x, y, width, background, borderColor) {
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.arc(x, y, width / 2, 0, 360);
  ctx.fill();

  if (borderColor != "None") {
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }
}

function Line(x1, y1, x2, y2, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Print(msg) {
  console.log(msg);
}

function Text(text, x, y, color, fontSize) {
  ctx.font = fontSize + "px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x + cellWidth / 2, y + cellWidth / 2);
}
