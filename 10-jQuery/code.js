const player1 = prompt("Player One Enter Your Name, you will be blue");
const player1Color = "blue";

const player2 = prompt("Player Two Enter Your Name, you will be red");
const player2Color = "red";

let game_on = true;
let table = $("table tr");

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum, colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

const changeColor = function (rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
};

const returnColor = function (rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
};

const checkBottom = function (colIndex) {
  let colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === "rgb(128,128,128)") {
      return row;
    }
  }
};

const colorMatchCheck = function (one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(128,128,128)" &&
    one !== undefined
  );
};

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horiz");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("vertical");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        return true;
      } else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$("h3").text(player1 + " its your turn, pick a column to drop in!");

$(".board button").on("click", function () {
  let col = $(this).closest("td").index();

  let bottomAvail = checkBottom(col);

  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $("h1").text(currentName + "You have won!");
    $("h3").fadeOut("fast");
    $("h2").fadeOut("fast");
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $("h3").text(currentName + " its your turn!");
    currentColor = player1Color;
  } else {
    currentName = player2;
    $("h3").text(currentName + " its your turn!");
    currentColor = player2Color;
  }
});
