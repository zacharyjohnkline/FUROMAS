"use strict";
// Player BusyStates
let p1BusyState = 0;
let p2BusyState = 0;

// Player Background Controls
let p1BG = "#4D6945";
let p2BG = "#722114";
const p1LockedBG = "#4DFF45";
const p2LockedBG = "#FF2114";

// Changing Game Variables
let round = 1;
let p1Score = 0;
let p2Score = 0;
let p1Choice = 0;
let p2Choice = 0;

// DOM Game Information
const gameMessage = document.querySelector(".message");
const p1ScoreEl = document.querySelector(".p1-score");
const p2ScoreEl = document.querySelector(".p2-score");
const roundEl = document.querySelector(".title");
const terryAnimation = document.querySelector(".p1-img");
const terryAnimationContainer = document.querySelector(".p1-character");
const sheeAnimation = document.querySelector(".p2-img");
const sheeAnimationContainer = document.querySelector(".p2-character");

const resetBusyState = function () {
  p1BusyState = 0;
  p2BusyState = 0;
};

const resetChoices = function () {
  p1Choice = 0;
  p2Choice = 0;
};

const changeBG = function (x, y) {
  document.querySelector(
    ".page-container"
  ).style.backgroundImage = `linear-gradient(
    90deg,
    ${x},
    ${y})`;
};

const resetBG = function () {
  p1BG = "#4D6945";
  p2BG = "#722114";
  setTimeout(() => {
    changeBG(p1BG, p2BG);
  }, 1500);
};

const resetRound = function () {
  resetChoices();
  setTimeout(() => {
    resetBusyState();
    resetBG();
  }, 1000);
};
const greenWins = function () {
  p1Score += 1;
  setTimeout(() => {
    p1ScoreEl.textContent = p1Score;
    changeBG(p1LockedBG, p1LockedBG);
  }, 1500);
  resetRound();
};
const redWins = function () {
  p2Score += 1;

  setTimeout(() => {
    p2ScoreEl.textContent = p2Score;
    changeBG(p2LockedBG, p2LockedBG);
  }, 1500);
  resetRound();
};

const greenWinner = function () {
  //terry jumping animation
  p1BusyState = 3;
  p2BusyState = 3;
  p1Score = 0;
  p2Score = 0;
  round = 1;
  roundEl.textContent = `Round ${round}`;
  gameMessage.textContent = `Rock, Paper, Scissors SHOOT!`;
  p1ScoreEl.textContent = `${p1Score}`;
  p2ScoreEl.textContent = `${p2Score}`;
  resetChoices();
  terryAnimation.src = "images/terry_animations/terry_paper/0001.png";
  sheeAnimation.src = "images/SHEE_ANIMATIONS/SHEE_PAPER/0001.png";
  document.querySelector(".winner-overlay").style.backgroundColor = "green";
  document.querySelector(".winner-overlay").style.zIndex = "10";
  document.querySelector(".winner-overlay").style.opacity = "1";
  document.querySelector(".winner-overlay").addEventListener("click", () => {
    document.querySelector(".winner-overlay").style.opacity = "0";
    document.querySelector(".winner-overlay").style.zIndex = "-10";
    p1BusyState = 0;
    p2BusyState = 0;
  });
};

const redWinner = function () {
  //terry jumping animation
  p1BusyState = 3;
  p2BusyState = 3;
  p1Score = 0;
  p2Score = 0;
  round = 1;
  roundEl.textContent = `Round ${round}`;
  gameMessage.textContent = `Rock, Paper, Scissors SHOOT!`;
  p1ScoreEl.textContent = p1Score;
  p2ScoreEl.textContent = p2Score;
  resetChoices();
  document.querySelector(
    ".winner-message"
  ).innerText = `Congratulations Shee!\n You've won the game! \n\n Click to play again!`;
  document.querySelector(".winner-overlay").style.backgroundColor = "red";
  document.querySelector(".winner-overlay").style.zIndex = "10";
  document.querySelector(".winner-overlay").style.opacity = "1";
  terryAnimation.src = "images/terry_animations/terry_paper/0001.png";
  sheeAnimation.src = "images/SHEE_ANIMATIONS/SHEE_PAPER/0001.png";
  document.querySelector(".winner-overlay").addEventListener("click", () => {
    document.querySelector(".winner-overlay").style.opacity = "0";
    document.querySelector(".winner-overlay").style.zIndex = "-10";
    p1BusyState = 0;
    p2BusyState = 0;
  });
};

const checkForWinner = function (a, b) {
  if (a === "ROCK" && b === "ROCK") {
    //Display CloseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Tie! \nRock vs Rock.`;
    }, 1500);
    resetRound();
  } else if (a === "ROCK" && b === "PAPER") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Shee Tocky Wins!\n  Paper covers Rock.`;
    }, 1500);
    redWins();
  } else if (a === "ROCK" && b === "SCISSORS") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Terry Cotta Wins!\n  Rock breaks Scissors.`;
    }, 1500);
    greenWins();
  } else if (a === "PAPER" && b === "ROCK") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Terry Cotta Wins!\n  Paper covers Rock.`;
    }, 1500);
    greenWins();
  } else if (a === "PAPER" && b === "PAPER") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Tie!\n  Paper vs Paper.`;
    }, 1500);
  } else if (a === "PAPER" && b === "SCISSORS") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Shee Tocky Wins!\n  Scissors cut Paper.`;
    }, 1500);
    redWins();
  } else if (a === "SCISSORS" && b === "ROCK") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Shee Tocky Wins!\n  Rock breaks Scissors.`;
    }, 1500);
    redWins();
  } else if (a === "SCISSORS" && b === "PAPER") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Terry Cotta Wins!\n  Scissors cut Paper.`;
    }, 1500);
    greenWins();
  } else if (a === "SCISSORS" && b === "SCISSORS") {
    //Display CLoseUp Overlay
    setTimeout(() => {
      gameMessage.innerText = `Tie!\n  Scissors vs Scissors.`;
    }, 1500);
    resetRound();
  }

  if (p1Score < 5 && p2Score < 5) {
    round++;
    resetRound();
  } else if (p1Score === 5) {
    setTimeout(() => {
      greenWinner();
    }, 1500);
  } else if (p2Score === 5) {
    setTimeout(() => {
      redWinner();
    }, 1500);
  }
};

const ready = function () {
  document.addEventListener("keypress", (keys) => {
    if (
      p1BusyState === 0 &&
      (keys.key === "q") | (keys.key === "w") | (keys.key === "e")
    ) {
      gameMessage.textContent = ``;
      p1BG = p1LockedBG;
      changeBG(p1BG, p2BG);
    } else if (
      p2BusyState === 0 &&
      (keys.key === "i") | (keys.key === "o") | (keys.key === "p")
    ) {
      gameMessage.textContent = ``;
      p2BG = p2LockedBG;
      changeBG(p1BG, p2BG);
    }

    if (p1BusyState === 0 && keys.key === "q") {
      p1Choice = "ROCK";
      console.log(p1Choice);
      p1BusyState = 1;
    } else if (p1BusyState === 0 && keys.key === "w") {
      p1Choice = "PAPER";
      console.log(p1Choice);
      p1BusyState = 1;
    } else if (p1BusyState === 0 && keys.key === "e") {
      p1Choice = "SCISSORS";
      console.log(p1Choice);
      p1BusyState = 1;
    }

    if (p2BusyState === 0 && keys.key === "i") {
      p2Choice = "ROCK";
      console.log(p2Choice);
      p2BusyState = 1;
    } else if (p2BusyState === 0 && keys.key === "o") {
      p2Choice = "PAPER";
      console.log(p2Choice);
      p2BusyState = 1;
    } else if (p2BusyState === 0 && keys.key === "p") {
      p2Choice = "SCISSORS";
      console.log(p2Choice);
      p2BusyState = 1;
    }

    if (p1BusyState === 1 && p2BusyState === 1) {
      p1BusyState = 3;
      p2BusyState = 3;
      sheeAnimation.src = `images/SHEE_ANIMATIONS/SHEE_${p2Choice}/SHEE_${p2Choice}.gif`;
      terryAnimation.src = `images/TERRY_ANIMATIONS/TERRY_${p1Choice}/TERRY_${p1Choice}.gif`;
    }

    if (round >= 2) {
      roundEl.textContent = `Round ${round}`;
    }

    if (typeof p1Choice === "string" && typeof p2Choice === "string") {
      checkForWinner(p1Choice, p2Choice);
    }
  });
};

ready();
