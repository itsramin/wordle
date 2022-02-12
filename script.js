import wordlist from "./words.js";
const word = wordlist[Math.floor(Math.random() * wordlist.length)];
const wordch = word.split("");
const keyselect = document.querySelectorAll(".key:not(.del)");
const del = document.querySelector(".del");
const newgame = document.querySelector(".newgame");
const buttonclick = document.querySelector("button");
const info = document.querySelector(".info");
var activecell = 0;
var rownum = 0;
const activerow = [".row1", ".row2", ".row3", ".row4", ".row5"];

// showing information
info.addEventListener("click", () => {
  const infoimg = document.querySelector(".infoimg");
  infoimg.classList.toggle("show");
  let greyout = document.querySelector(".container");
  greyout.classList.toggle("pagegray");
});
//
/*  const aaa = document.querySelector("div");
  if (aaa.classList[1] == "pagegray") {
    console.log(true);
    document.body.addEventListener(
      "click",
      () => {
        let greyout = document.querySelector("div");
        greyout.classList.remove("pagegray");
      },
      true
    );
  }
*/
//
// delete charachters
del.addEventListener("click", () => {
  if (activecell === 0) {
  } else {
    let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    cell[activecell - 1].textContent = "";
    activecell = activecell - 1;
  }
});
// Start new game
newgame.addEventListener("click", () => {
  // window.location.reload();
  activecell = 0;
  rownum = 0;
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("green", "yellow", "gray");
  });
});
// keyboard keys
keyselect.forEach((item) => {
  item.addEventListener("click", () => {
    let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    if (activecell < 5 && cell[activecell].textContent === "") {
      cell[activecell].textContent = item.textContent;
      activecell = activecell + 1;
    }
    const status = document.querySelector(".status");
    status.textContent = "";
  });
});
// submit word
buttonclick.addEventListener("click", () => {
  let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
  if (
    cell[0].textContent === "" ||
    cell[1].textContent === "" ||
    cell[2].textContent === "" ||
    cell[3].textContent === "" ||
    cell[4].textContent === ""
  ) {
    lowletter();
  } else {
    checkword();
  }
});
// Checking all characters function
function checkword() {
  for (let f = 0; f < word.length; f++) {
    let letters = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    if (wordch[f] === letters[f].textContent) {
      letters[f].classList.add("green");
    } else if (wordch.includes(letters[f].textContent)) {
      letters[f].classList.add("yellow");
    } else {
      letters[f].classList.add("gray");
    }
  }
  keyselect.forEach((item) => {
    item.classList.remove("keyselect");
  });
  let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
  if (
    cell[0].classList.contains("green") &&
    cell[1].classList.contains("green") &&
    cell[2].classList.contains("green") &&
    cell[3].classList.contains("green") &&
    cell[4].classList.contains("green")
  ) {
    won();
  }

  activecell = 0;
  rownum = rownum + 1;
}
// winning fucntion
function won() {
  const status = document.querySelector(".status");
  status.textContent = "!شما برنده شدید";
  status.classList.add("greentext");
}
// Low letters function
function lowletter() {
  const status = document.querySelector(".status");
  status.textContent = ".تعداد حروف کافی نمی‌باشد";
  status.classList.add("redtext");
}
