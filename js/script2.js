"use strict";
let p1Choice = 0;
let p2Choice = 0;
let p1Locked = `rgb(31, 119, 146)`;
let p2Locked = `rgb(145, 17, 117)`;
let round = 1;
let p1ScoreEl = document.querySelector(".p1score");
let p2ScoreEl = document.querySelector(".p2score");
let p1Score = 0;
let p2Score = 0;

const message = document.getElementById("message2ndgame");

const changeBG = function (a) {
  if (a === p1Locked) {
    p1Locked = `rgb(49, 177, 216)`;
  } else {
    p2Locked = `rgb(228, 31, 185)`;
  }
};

const pageBG = function (a, b) {
  document.querySelector(
    ".page-container"
  ).style.backgroundImage = `linear-gradient(90deg, ${a}, ${b})`;
};

const gameOver = function () {
  if (p1Score === 5) {
    pageBG(p1Locked, p1Locked);
  } else if (p2Score === 5) {
    pageBG(p2Locked, p2Locked);
  }
  //   round = 1;
  p1Choice = 1;
  p2Choice = 1;
  p1ScoreEl.textContent = p1Score;
  p2ScoreEl.textContent = p2Score;
  restart();
};

const restart = function () {
  window.addEventListener("click", function () {
    document.querySelector(".score-containers").style.opacity = "1";
    message.style.marginTop = "25%";
    message.style.fontSize = "3rem";
    p1Choice = 0;
    p2Choice = 0;
    p1Score = 0;
    p2Score = 0;
    p1ScoreEl.textContent = p1Score;
    p2ScoreEl.textContent = p2Score;
    round = 1;
    p1Locked = `rgb(31, 119, 146)`;
    p2Locked = `rgb(145, 17, 117)`;
    pageBG(p1Locked, p2Locked);
    message.textContent = "Rock, Paper, Scissors, SHOOT!";
  });
};

const resetBG = function () {
  message.textContent = `Round ${round}!`;
  p1Locked = `rgb(31, 119, 146)`;
  p2Locked = `rgb(145, 17, 117)`;
  pageBG(p1Locked, p2Locked);
};

const init = function () {
  document.addEventListener("keypress", function (x) {
    if (p1Choice === 0 && (x.key === "q") | (x.key === "w") | (x.key === "e")) {
      changeBG(p1Locked);
      pageBG(p1Locked, p2Locked);
    } else if (
      p2Choice === 0 &&
      (x.key === "i") | (x.key === "o") | (x.key === "p")
    ) {
      changeBG(p2Locked);
      pageBG(p1Locked, p2Locked);
    }

    if (p1Choice === 0 && x.key === "q") {
      p1Choice = "Rock";
      console.log(p1Choice);
    } else if (p1Choice == 0 && x.key === "w") {
      p1Choice = "Paper";
      console.log(p1Choice);
    } else if (p1Choice === 0 && x.key === "e") {
      p1Choice = "Scissors";
      console.log(p1Choice);
    }

    if (p2Choice === 0 && x.key === "i") {
      p2Choice = "Rock";
      console.log(p2Choice);
    } else if (p2Choice == 0 && x.key === "o") {
      p2Choice = "Paper";
      console.log(p2Choice);
    } else if (p2Choice === 0 && x.key === "p") {
      p2Choice = "Scissors";
      console.log(p2Choice);
    }

    if (typeof p1Choice === "string" && typeof p2Choice === "string") {
      checkWhoWon(p1Choice, p2Choice);
    }
    if (p1Score >= 5) {
      document.querySelector(".score-containers").style.opacity = "0";
      message.style.width = "50%";
      message.style.marginTop = "10%";
      message.style.fontSize = "5rem";
      message.textContent = `GAME OVER. BLUE WON!
      Click to play again.`;
      gameOver();
    } else if (p2Score >= 5) {
      document.querySelector(".score-containers").style.opacity = "0";
      message.style.width = "50%";
      message.style.marginTop = "10%";
      message.style.fontSize = "5rem";
      message.textContent = `GAME OVER. MAGENTA WINS!
      Click to play again.`;
      gameOver();
    }
  });
};
const backToZero = function () {
  p1Choice = 0;
  p2Choice = 0;
};
const backTo2 = function () {
  p1Choice = 2;
  p2Choice = 2;
};
const greenWins = function () {
  p1Score += 1;
  p1ScoreEl.textContent = p1Score;
  pageBG(p1Locked, p1Locked);
  backTo2();
};
const redWins = function () {
  p2Score += 1;
  p2ScoreEl.textContent = p2Score;
  pageBG(p2Locked, p2Locked);
  backTo2();
};

const checkWhoWon = function (a, b) {
  if (p1Score < 5 && p2Score < 5) {
    if (a === b) {
      message.textContent = `TIE! ${p1Choice} and ${p2Choice}!`;
      backTo2();
    } else if (a === "Rock" && b === "Paper") {
      message.textContent = `MAGENTA WINS! Paper covers Rock!`;
      redWins();
    } else if (a === "Rock" && b === "Scissors") {
      message.textContent = `BLUE WINS! Rock breaks Scissors!`;
      greenWins();
    } else if (a === "Paper" && b === "Rock") {
      message.textContent = `BLUE WINS! Paper covers Rock!`;
      greenWins();
    } else if (a === "Paper" && b === "Scissors") {
      message.textContent = `MAGENTA WINS! Scissors cut Paper!`;
      redWins();
    } else if (a === "Scissors" && b === "Rock") {
      message.textContent = `MAGENTA WINS! Rock breaks Scissors`;
      redWins();
    } else if (a === "Scissors" && b === "Paper") {
      message.textContent = `BLUE WINS! Scissors cut Paper`;
      greenWins();
    }
    if (p1Score < 5 && p2Score < 5) {
      round++;
      setTimeout(function () {
        resetBG();
        backToZero();
      }, 2000);
    }
  }
};
init();
