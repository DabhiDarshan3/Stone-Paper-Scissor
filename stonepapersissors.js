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
  if (moveHistory.length < 2) {
    return null; // Not enough data for prediction
  }

  // Simple frequency-based prediction
  let rockCount = 0,
    paperCount = 0,
    scissorCount = 0;

  moveHistory.forEach((move) => {
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

compChoice = () => {
  // Use AI/ML prediction to choose computer move
  let predictedMove = predictNextMove();
  if (predictedMove) {
    return getCounterMove(predictedMove);
  } else {
    // Fallback to random choice if no prediction
    let idx = Math.floor(Math.random() * 3);
    let comp_choice = comp_choices[idx];
    return comp_choice;
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    let yourChoiceId = choice.getAttribute("id");

    // Track user move history
    moveHistory.push(yourChoiceId);
    if (moveHistory.length > maxHistoryLength) {
      moveHistory.shift(); // Keep history length limited
    }

    let compChoiceId = compChoice();
    console.log(yourChoiceId, compChoiceId);
    checkWinner(yourChoiceId, compChoiceId);
  });
});
