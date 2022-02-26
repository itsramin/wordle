import wordlist from "./words2.js";
let wordset = [...wordlist];
let word = wordset[Math.floor(Math.random() * wordset.length)];
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
const activerow = [".row1", ".row2", ".row3", ".row4", ".row5", ".row6"];
const status = document.querySelector(".status");
const wons = document.querySelector(".wons");
const losts = document.querySelector(".losts");

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
      // changing current rows border to initial
      let focusrow = document.querySelectorAll(`${activerow[rownum]}>.cell`);
      focusrow.forEach((item) => {
        item.style.borderColor = "initial";
      });

      // go to next row and change activecell to 0
      rownum++;
      activecell = 0;

      // changing current rows border to initial
      focusrow = document.querySelectorAll(`${activerow[rownum]}>.cell`);
      focusrow.forEach((item) => {
        item.style.borderColor = "#79b8e1";
      });

      // check if user loss the game
      if (rownum === 6) {
        status.textContent = `کلمه مورد نظر ${word} بود.`;
        losts.textContent = Number(losts.textContent) + 1;
        setCookie("lostsNum", Number(losts.textContent), 30);
        winnertrue = true;
      }
    }
  } else {
    status.textContent = `این کلمه در دیتابیس موجود نمی‌باشد.`;
  }
}
// winning fucntion
function won() {
  status.textContent = "شما برنده شدید!";
  status.classList.add("greentext");
  wons.textContent = Number(wons.textContent) + 1;
  setCookie("wonsNum", Number(wons.textContent), 30);
}
// Low letters function
function lowletter() {
  const status = document.querySelector(".status");
  status.textContent = "تعداد حروف کافی نمی‌باشد.";
  status.classList.add("redtext");
}
// check cookie is available
function checkCookie() {
  let num_wons = getCookie("wonsNum");
  let num_losts = getCookie("lostsNum");
  if (num_wons != "") {
    wons.textContent = num_wons;
    losts.textContent = num_losts || 0;
  } else {
    wons.textContent = 0;
    losts.textContent = 0;
  }
}
// get cookies number
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// set cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// check cookies on page load
window.addEventListener("load", function () {
  setTimeout(checkCookie, 5);
  let focusrow = document.querySelectorAll(`${activerow[rownum]}>.cell`);
  focusrow.forEach((item) => {
    item.style.borderColor = "#79b8e1";
  });
});
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
  wordset.splice(wordset.indexOf(word), 1);
  if (wordset.length !== 0) {
    word = wordset[Math.floor(Math.random() * wordset.length)];
    wordch = word.split("");
    let cells = document.querySelectorAll(".cell");
    for (let eachcell of cells) {
      eachcell.classList.remove("green");
      eachcell.classList.remove("yellow");
      eachcell.classList.remove("gray");
      eachcell.style.borderColor = "#d8d8d8";
      eachcell.textContent = "";
    }

    winnertrue = false;
    activecell = 0;
    rownum = 0;
    cellcombine = "";
    let focusrow = document.querySelectorAll(`${activerow[rownum]}>.cell`);
    focusrow.forEach((item) => {
      item.style.borderColor = "#79b8e1";
    });
    status.classList.remove("greentext");
    status.textContent = "";
  } else {
    status.textContent = "لغات به اتمام رسید.";
  }
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
