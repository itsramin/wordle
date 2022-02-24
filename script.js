import wordlist from "./words.js";

let word = wordlist[Math.floor(Math.random() * wordlist.length)];
let wordch = word.split("");
let winnertrue = false;
let cellcombine = "";
let activecell = 0;
let rownum = 0;
const key = document.querySelectorAll(".key:not(.del)");
const del = document.querySelector(".del");
const newgame = document.querySelector(".newgame");
const sub = document.querySelector(".sub");
const info = document.querySelector(".info");
const overlay = document.querySelector(".overlay");
const closeinfo = document.querySelector(".closeinfo");
const infopage = document.querySelector(".infopage");
const activerow = [".row1", ".row2", ".row3", ".row4", ".row5"];
const status = document.querySelector(".status");

// checking the word is correct or not
function checkword() {
  if (wordlist.includes(cellcombine)) {
    wordch = word.split("");
    let cells = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    for (let ch = 0; ch < cells.length; ch++) {
      if (wordch[ch] === cells[ch].textContent) {
        cells[ch].classList.add("green");
        wordch[ch] = "x";
      }
    }
    for (let otherch = 0; otherch < cells.length; otherch++) {
      if (wordch[otherch] === "x") {
        continue;
      } else if (cells[otherch].textContent === wordch[0]) {
        cells[otherch].classList.add("yellow");
        wordch[0] = "y";
        continue;
      } else if (cells[otherch].textContent === wordch[1]) {
        cells[otherch].classList.add("yellow");
        wordch[1] = "y";
        continue;
      } else if (cells[otherch].textContent === wordch[2]) {
        cells[otherch].classList.add("yellow");
        wordch[2] = "y";
        continue;
      } else if (cells[otherch].textContent === wordch[3]) {
        cells[otherch].classList.add("yellow");
        wordch[3] = "y";
        continue;
      } else if (cells[otherch].textContent === wordch[4]) {
        cells[otherch].classList.add("yellow");
        wordch[4] = "y";
        continue;
      } else {
        cells[otherch].classList.add("gray");
      }
    }
    if (
      cells[0].classList.contains("green") &&
      cells[1].classList.contains("green") &&
      cells[2].classList.contains("green") &&
      cells[3].classList.contains("green") &&
      cells[4].classList.contains("green")
    ) {
      winnertrue = true;
      setTimeout(won, 10);
    } else {
      rownum++;
      if (rownum === 5) {
        status.textContent = `کلمه مورد نظر ${word} بود.`;
        winnertrue = true;
      }
      activecell = 0;
    }
  } else {
    status.textContent = `.این کلمه در دیتابیس موجود نمی‌باشد`;
  }
}
// winning fucntion
function won() {
  status.textContent = "!شما برنده شدید";
  status.classList.add("greentext");
}
// Low letters function
function lowletter() {
  const status = document.querySelector(".status");
  status.textContent = ".تعداد حروف کافی نمی‌باشد";
  status.classList.add("redtext");
}

// showing information
info.addEventListener("click", function () {
  infopage.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
// delete charachters
del.addEventListener("click", function () {
  if (activecell !== 0 && winnertrue === false) {
    let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    cell[activecell - 1].textContent = "";
    activecell--;
    status.textContent = "";
  }
});
// Start new game
newgame.addEventListener("click", function () {
  word = wordlist[Math.floor(Math.random() * wordlist.length)];
  wordch = word.split("");
  let cells = document.querySelectorAll(".cell");
  for (let kkk of cells) {
    kkk.classList.remove("green");
    kkk.classList.remove("yellow");
    kkk.classList.remove("gray");
    kkk.textContent = "";
  }
  winnertrue = false;
  activecell = 0;
  rownum = 0;
  cellcombine = "";
  status.classList.remove("greentext");
  status.textContent = "";
});
// submit word
sub.addEventListener("click", function () {
  if (winnertrue === false) {
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
  }
});
// keyboard keys
key.forEach((item) => {
  item.addEventListener("click", function () {
    if (winnertrue === false) {
      if (status.classList.contains("greentext") === false) {
        let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
        if (activecell < 5 && cell[activecell].textContent === "") {
          cell[activecell].textContent = item.textContent;
          activecell++;
          cellcombine =
            cell[0].textContent +
            cell[1].textContent +
            cell[2].textContent +
            cell[3].textContent +
            cell[4].textContent;
        }
      }
      status.textContent = "";
    }
  });
});
// close info page
closeinfo.addEventListener("click", function () {
  infopage.classList.add("hidden");
  overlay.classList.add("hidden");
});
