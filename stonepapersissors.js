let yourScore = 0;
let compScore = 0;
let comp_choices = ["rock", "paper", "scissor"];
let choices = document.querySelectorAll(".choice");
let youWin = false;

// AI/ML variables
let moveHistory = [];
let maxHistoryLength = 10; // Keep last 10 moves for prediction

let yourScr = document.querySelector("#your-score");
let compScr = document.querySelector("#comp-score");
let msg = document.querySelector("#msg");

function predictNextMove() {
  if (moveHistory.length < 3) {
    return null; // Not enough data for prediction
  }

  // Frequency-based prediction on last 3 moves
  let recentMoves = moveHistory.slice(-3);
  let rockCount = 0,
    paperCount = 0,
    scissorCount = 0;

  recentMoves.forEach((move) => {
    if (move === "rock") rockCount++;
    else if (move === "paper") paperCount++;
    else if (move === "scissor") scissorCount++;
  });

  // Predict the most frequent move
  let predictedMove;
  if (rockCount >= paperCount && rockCount >= scissorCount) {
    predictedMove = "rock";
  } else if (paperCount >= rockCount && paperCount >= scissorCount) {
    predictedMove = "paper";
  } else {
    predictedMove = "scissor";
  }

  return predictedMove;
}

function getCounterMove(predictedMove) {
  if (predictedMove === "rock") return "paper";
  if (predictedMove === "scissor") return "rock";
  if (predictedMove === "paper") return "scissor";
  return comp_choices[Math.floor(Math.random() * 3)];
}

function checkWinner(you, com) {
  if (you == com) {
    msg.innerText = "It's Draw";
    msg.style.background = "black";
  } else {
    if (you === "rock") {
      //paper - scissor
      youWin = com == "paper" ? false : true;
    } else if (you === "paper") {
      //rock - scissor
      youWin = com == "scissor" ? false : true;
    } else {
      //paper - rock
      youWin = com == "rock" ? false : true;
    }
    if (youWin) {
      yourScore++;
      yourScr.innerText = yourScore;
      msg.innerText = "You win!";
      msg.style.background = "green";
    } else {
      compScore++;
      compScr.innerText = compScore;
      msg.innerText = "Comp win!";
      msg.style.background = "red";
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playRound(yourChoiceId) {
  // Track user move history
  moveHistory.push(yourChoiceId);
  if (moveHistory.length > maxHistoryLength) {
    moveHistory.shift(); // Keep history length limited
  }

  // Add delay to simulate computer thinking
  msg.innerText = "Computer is thinking...";
  msg.style.background = "orange";

  await delay(1000);

  let compChoiceId = compChoice();
  console.log(yourChoiceId, compChoiceId);
  checkWinner(yourChoiceId, compChoiceId);
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    // Add shake animation class
    choice.classList.add("shake");

    // Remove shake class after animation duration
    setTimeout(() => {
      choice.classList.remove("shake");
    }, 500);

    playRound(choice.getAttribute("id"));
  });
});
