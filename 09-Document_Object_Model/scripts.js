const spaces = document.querySelectorAll(".space");
const btn = document.querySelector(".btn");

function changeMarker() {
  if (this.textContent === "") {
    this.textContent = "X";
  } else if (this.textContent === "X") {
    this.textContent = "O";
  } else this.textContent === "O";
  this.textContent = "";
}

for (let i = 0; i < spaces.length; i++) {
  spaces[i].addEventListener("click", changeMarker);
}

function clearBoard() {
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].textContent = "";
  }
}

btn.addEventListener("click", clearBoard);
