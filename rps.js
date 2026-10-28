// Get HTML elements
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const drawScoreElement = document.getElementById("draw-score");

const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");

const resultElement = document.getElementById("result");
const robotMessageElement = document.getElementById("robot-message");

const weaponButtons = document.querySelectorAll(".weapon");
const resetButton = document.getElementById("reset-button");

// Initialize scores

let playerScore = 0;
let computerScore = 0;
let draws = 0;

// Available choices

const choices = ["rock", "paper", "scissors"];

// Robot messages

const winMessages = [
    "Nooo! My circuits are fried!",
    "Impossible! A human defeated me!",
    "ERROR 404: Victory not found!",
    "I demand a rematch, human!"
];

const loseMessages = [
    "HAHA! Bow down to your robot overlord!",
    "Your defeat was mathematically inevitable!",
    "Human weakness detected!",
    "Another victory for the superior machine!"
];

const drawMessages = [
    "Hey! Are you a robot too?",
    "Stop copying my moves, human!",
    "A tie? My calculations are confused!",
    "We are equally matched... for now!"
];

// Generate a random choice for the robot

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Select a random message

function getRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// Play one round

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    // Display both choices
    playerChoiceElement.textContent = playerChoice.toUpperCase();
    computerChoiceElement.textContent = computerChoice.toUpperCase();

    // Check for a draw
    if (playerChoice === computerChoice) {
        draws++;
        resultElement.textContent = "IT'S A DRAW!";
        resultElement.style.color = "#f5c451";
        robotMessageElement.textContent = getRandomMessage(drawMessages);
    }

    // Check whether the player wins
    else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        resultElement.textContent = "YOU WIN THIS ROUND!";
        resultElement.style.color = "#00d9ff";
        robotMessageElement.textContent = getRandomMessage(winMessages);
    }

    // Otherwise, the robot wins
    else {
        computerScore++;
        resultElement.textContent = "EVIL ROBOT WINS!";
        resultElement.style.color = "#ff416c";
        robotMessageElement.textContent = getRandomMessage(loseMessages);
    }

    // Update the scoreboard
    updateScoreboard();
}

// Update scores on the page

function updateScoreboard() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    drawScoreElement.textContent = draws;
}

// Reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    draws = 0;

    // Reset displayed information
    updateScoreboard();
    playerChoiceElement.textContent = "Ready to fight?";
    computerChoiceElement.textContent = "I will defeat you!";
    resultElement.textContent = "CHOOSE YOUR WEAPON";
    resultElement.style.color = "#00d9ff";
    robotMessageElement.textContent ="Prepare yourself, human. My circuits are ready!";
}

// Listen for weapon button clicks
weaponButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});

// Listen for reset button clicks
resetButton.addEventListener("click", resetGame);