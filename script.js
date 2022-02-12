import wordlist from "./words.js";

// const word = wordlist[Math.floor(Math.random() * wordlist.length)];
const word = wordlist[7];
console.log(word);
const wordch = word.split("");
const key = document.querySelectorAll(".key:not(.del)");
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
  window.location.reload();
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
  const ccc = [];
  for (let f = 0; f < 5; f++) {
    const letters = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    if (wordch[f] === letters[f].textContent) {
      letters[f].classList.add("green");
      ccc.push(f);
    }
  }
  console.log(ccc);
  let www = wordch;
  for (let p = 0; p < ccc.length; ++p) {
    const index = www.indexOf(wordch[ccc[p] - p]);
    if (index > -1) {
      www.splice(index, 1);
    }
  }
  console.log(www);
  let qqq = 0;
  let rrr = 0;
  for (let f = 0; f < 5; f++) {
    if (f === ccc[rrr]) {
      ++rrr;
    } else {
      const letters = document.querySelectorAll(
        `${activerow[rownum]}>.cell:not(.green)`
      );
      if (www.includes(letters[qqq].textContent)) {
        letters[qqq].classList.add("yellow");
        ++qqq;
      } else {
        letters[qqq].classList.add("gray");
        ++qqq;
      }
    }
  }

  // if (wordch[f] === letters[f].textContent) {
  //   letters[f].classList.add("green");
  // } else if (wordch.includes(letters[f].textContent)) {
  //   letters[f].classList.add("yellow");
  // } else {
  //   letters[f].classList.add("gray");
  // }
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
  ++rownum;
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
// keyboard keys
key.forEach((item) => {
  item.addEventListener("click", () => {
    const status = document.querySelector(".status");
    if (status.classList.contains("greentext") === false) {
      let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
      if (activecell < 5 && cell[activecell].textContent === "") {
        cell[activecell].textContent = item.textContent;
        activecell = activecell + 1;
      }
    }
    status.textContent = "";
  });
});
