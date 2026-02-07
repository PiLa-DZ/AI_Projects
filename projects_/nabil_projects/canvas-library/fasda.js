function DrawNums() {
  var cellNum = 0;
  for (var i = 14; i > -1; i -= 2) {
    for (var j = 0; j < 10; j++) {
      Text(cellNum, j * cellWidth, i * cellWidth, "black");
      cellNum++;
    }
    cellNum += 10;
  }
  cellNum = 10;
  for (var i = 13; i > -1; i -= 2) {
    for (var j = 9; j > -1; j--) {
      Text(cellNum, j * cellWidth, i * cellWidth, "black");
      cellNum++;
    }
    cellNum += 10;
  }
}
