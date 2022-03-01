import wordlist from "./words.js";
import wordlist2 from "./words2.js";
import wordlist3 from "./words3.js";

var wordset =
  getCookie("wonsNumCity") !== ""
    ? [...getCookie("wordsetcity").split(",")]
    : [...wordlist2];
var word = wordset[Math.floor(Math.random() * wordset.length)];
var wordch = word.split("");
var winnertrue = false;
var activecell = 0;
var rownum = 0;
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
const setting = document.querySelector(".setting");
const settingpage = document.querySelector(".settingpage");
const deletescores = document.querySelector(".deletescores");
const closesetting = document.querySelector(".closesetting");
const city = document.querySelector(".city");
const animal = document.querySelector(".animal");
const fruit = document.querySelector(".fruit");
const option = document.querySelectorAll(".option");
const subject = document.querySelector(".subject");

// checking the word is correct or not
function checkword() {
  let wordch = word.split("");
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
      // setCookie("lostsNum", Number(losts.textContent), 30);
      wordset.splice(wordset.indexOf(word), 1);
      if (city.classList.contains("optionselected")) {
        setCookie("lostsNumCity", Number(losts.textContent), 30);
        setCookie("wordsetCity", wordset, 30);
      } else if (animal.classList.contains("optionselected")) {
        setCookie("wordsetAnimal", wordset, 30);
        setCookie("lostsNumAnimal", Number(losts.textContent), 30);
      } else {
        setCookie("wordsetFruit", wordset, 30);
        setCookie("lostsNumFruit", Number(losts.textContent), 30);
      }
      winnertrue = true;
    }
  }
}
// winning fucntion
function won() {
  status.textContent = "شما برنده شدید!";
  status.classList.add("greentext");
  wons.textContent = Number(wons.textContent) + 1;

  wordset.splice(wordset.indexOf(word), 1);
  if (city.classList.contains("optionselected")) {
    setCookie("wordsetCity", wordset, 30);
    setCookie("wonsNumCity", Number(wons.textContent), 30);
  } else if (animal.classList.contains("optionselected")) {
    setCookie("wordsetAnimal", wordset, 30);
    setCookie("wonsNumAnimal", Number(wons.textContent), 30);
  } else {
    setCookie("wordsetFruit", wordset, 30);
    setCookie("wonsNumFruit", Number(wons.textContent), 30);
  }
}
// Low letters function
function lowletter() {
  const status = document.querySelector(".status");
  status.textContent = "تعداد حروف کافی نمی‌باشد.";
  status.classList.add("redtext");
}
// check cookie is available
function checkCookie() {
  let num_wons = getCookie("wonsNumCity");
  let num_losts = getCookie("lostsNumCity");

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
// new game function
function newGame() {
  if (wordset.length !== 1) {
    word = wordset[Math.floor(Math.random() * wordset.length)];
    wordch = word.split("");
    resetcells();
  } else {
    status.textContent = "لغات به اتمام رسید.";
  }
}
// reset all cells to default
function resetcells() {
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
  let focusrow = document.querySelectorAll(`${activerow[rownum]}>.cell`);
  focusrow.forEach((item) => {
    item.style.borderColor = "#79b8e1";
  });
  status.classList.remove("greentext");
  status.textContent = "";
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
newgame.addEventListener("click", newGame);
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
      setTimeout(checkword, 10);
    }
  }
});
// keyboard keys
key.forEach((item) => {
  item.addEventListener("click", function () {
    if (winnertrue === false && wordset.length !== 1) {
      if (status.classList.contains("greentext") === false) {
        let cell = document.querySelectorAll(`${activerow[rownum]}>.cell`);
        if (activecell < 5 && cell[activecell].textContent === "") {
          cell[activecell].textContent = item.textContent;

          activecell++;
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
// close setting page
closesetting.addEventListener("click", function () {
  settingpage.classList.add("hidden");
  overlay.classList.add("hidden");
});
// open setting page
setting.addEventListener("click", function () {
  settingpage.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
// delete cookies
deletescores.addEventListener("click", function () {
  if (confirm("مطمئنی می‌خوای امتیازارو پاک کنی؟")) {
    if (city.classList.contains("optionselected")) {
      setCookie("wonsNumCity", 0, -10);
      setCookie("lostsNumCity", 0, -10);
      setCookie("wordsetCity", 0, -10);
    } else if (animal.classList.contains("optionselected")) {
      setCookie("wonsNumAnimal", 0, -10);
      setCookie("lostsNumAnimal", 0, -10);
      setCookie("wordsetAnimal", 0, -10);
    } else {
      setCookie("wonsNumFruit", 0, -10);
      setCookie("lostsNumFruit", 0, -10);
      setCookie("wordsetFruit", 0, -10);
    }

    wons.textContent = 0;
    losts.textContent = 0;
    alert("امتیازها پاک شدند.");
  }
});
// select animal list
animal.addEventListener("click", function () {
  option.forEach((item) => {
    item.classList.remove("optionselected");
  });
  animal.classList.add("optionselected");
  let num_wons = getCookie("wonsNumAnimal");
  let num_losts = getCookie("lostsNumAnimal");

  if (num_wons != "") {
    wons.textContent = num_wons;
    losts.textContent = num_losts || 0;
  } else {
    wons.textContent = 0;
    losts.textContent = 0;
  }
  subject.innerHTML = "حیوانات";
  wordset = [...wordlist3];
  word = wordset[Math.floor(Math.random() * wordset.length)];
  resetcells();
});
// select city list
city.addEventListener("click", function () {
  option.forEach((item) => {
    item.classList.remove("optionselected");
  });
  city.classList.add("optionselected");
  let num_wons = getCookie("wonsNumCity");
  let num_losts = getCookie("lostsNumCity");

  if (num_wons != "") {
    wons.textContent = num_wons;
    losts.textContent = num_losts || 0;
  } else {
    wons.textContent = 0;
    losts.textContent = 0;
  }
  subject.innerHTML = "شهرهای ایران";
  wordset = [...wordlist2];
  word = wordset[Math.floor(Math.random() * wordset.length)];
  resetcells();
});
// select fruit list
fruit.addEventListener("click", function () {
  option.forEach((item) => {
    item.classList.remove("optionselected");
  });
  fruit.classList.add("optionselected");
  let num_wons = getCookie("wonsNumFruit");
  let num_losts = getCookie("lostsNumFruit");

  if (num_wons != "") {
    wons.textContent = num_wons;
    losts.textContent = num_losts || 0;
  } else {
    wons.textContent = 0;
    losts.textContent = 0;
  }
  subject.innerHTML = "میوه‌ها";
  wordset = [...wordlist];
  word = wordset[Math.floor(Math.random() * wordset.length)];
  resetcells();
});
