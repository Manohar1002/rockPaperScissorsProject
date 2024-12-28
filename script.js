const yourScore = document.getElementById("yourScore");
const computerScore = document.getElementById("computerScore");
const answer = document.querySelector(".middleSection");
const answerSection = document.querySelector(".answerSection");
const playAgain = document.querySelector(".playAgain");
const playAgain2 = document.getElementById("playAgain2");
const resultText = document.querySelector(".resultText");
const rulesButton = document.querySelector(".rulesButton");
const closeButton = document.querySelector(".closeRulesBox");
const div2 = document.querySelector(".computerWOn");
const div = document.querySelector(".youWon");
const nextButton = document.getElementById("nextButton");
const resultSub = document.getElementById("resultSub");
const rulesBox = document.querySelector(".rulesBox");
const userWonButton = document.getElementById("userWonIcon");
const computerWonIcon = document.getElementById("computerWonIcon");
const header = document.getElementById("header");
const finalPage = document.getElementById("finalPage");

const options = ["rock", "paper", "scissors"];

const IconCenter = {
  rock: "./rockimg.png",
  paper: "./paperimg.png",
  scissors: "./scissorsimg.png",
};
const BorderColorClass = {
  rock: "rockBackground",
  paper: "paperBackground",
  scissors: "scissorsBackground",
};

const winningConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

let yourScoreh = parseInt(localStorage.getItem("yourScoreh") || 0);
let computerScoreh = parseInt(localStorage.getItem("computerScoreh") || 0);

yourScore.textContent = yourScoreh;
computerScore.textContent = computerScoreh;

let yourChoice = "";
let computerChoice = "";

answer.addEventListener("click", (e) => {
  const button = e.target.closest(".button");

  if (button) {
    const img = button.querySelector("img");
    if (img) {
      yourChoice = img.alt;
    }

    computerChoice = options[Math.floor(Math.random() * options.length)];

    answer.style.display = "none";

    updateScores(yourChoice, computerChoice);
    BorderColor();
  }
});

function updateScores(yourChoice, computerChoice) {
  answerSection.style.display = "flex";

  document.getElementById("yourAnswerImage").src = IconCenter[yourChoice];

  document.getElementById("computerAnswerImage").src =
    IconCenter[computerChoice];

  if (yourChoice === computerChoice) {
    removePulse();
    displayResult("Tie up", "", "Replay");
  } else if (winningConditions[yourChoice] === computerChoice) {
    yourScoreh++;
    localStorage.setItem("yourScoreh", yourScoreh);
    addPulse(div, div2);
    displayResult("You Win", "Against PC", "Play Again");
    nextButton.style.display = "block";
  } else {
    computerScoreh++;
    localStorage.setItem("computerScoreh", computerScoreh);
    addPulse(div2, div);
    displayResult("You Lost", "Against PC", "Play Again");
  }

  yourScore.textContent = yourScoreh;
  computerScore.textContent = computerScoreh;
}

rulesButton.addEventListener("click", () => {
  rulesBox.classList.add("rulesBoxPopUp");
});

closeButton.addEventListener("click", () => {
  rulesBox.classList.remove("rulesBoxPopUp");
});

playAgain.addEventListener("click", () => {
  removeBorderColor();

  displayNone("none");
  answer.style.display = "grid";
});

playAgain2.addEventListener("click", () => {
  finalPage.style.display = "none";
  header.style.display = "flex";
  answer.style.display = "grid";
});

nextButton.addEventListener("click", () => {
  displayNone("none");
  header.style.display = "none";
  finalPage.style.display = "flex";
});

function displayNone(none) {
  answerSection.style.display = none;

  nextButton.style.display = none;
}

function removePulse() {
  div2.classList.remove("pulse");
  div.classList.remove("pulse");
}

function addPulse(winner, loser) {
  loser.classList.remove("pulse");
  winner.classList.add("pulse");
}

function displayResult(mainText, subText, buttonText) {
  resultText.textContent = mainText;
  resultSub.textContent = subText;
  playAgain.textContent = buttonText;
}

function BorderColor() {
  userWonButton.classList.add(BorderColorClass[yourChoice]);
  computerWonIcon.classList.add(BorderColorClass[computerChoice]);
}
function removeBorderColor() {
  userWonButton.classList.remove(BorderColorClass[yourChoice]);
  computerWonIcon.classList.remove(BorderColorClass[computerChoice]);
}
