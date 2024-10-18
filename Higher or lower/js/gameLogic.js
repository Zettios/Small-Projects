import { clubCards, diamondCards, heartCards, spadeCards } from "../classes/CardDeck.js";

const responseMessage = document.getElementById("responseMessage");
const shownCard = document.getElementById("shownCard");
const hiddenCard = document.getElementById("hiddenCard");
const scoreCounter = document.getElementById("scoreCounter");
const highscoreCounter = document.getElementById("highscoreCounter");

const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");

const cardSet = new Map([...spadeCards, ...heartCards, ...clubCards, ...diamondCards]);
let cardArray = undefined;

let currentCard = undefined;
let playerGuessSelection = '';
let playingFlipAnimation = false;
let gameOver = false;

let animationStage = 0;
let score = 0;

/* ==================== EVENT LISTENERS ==================== */

window.addEventListener("load", () => {
    shuffleCards();
    loadNextShownCardImage(cardArray.shift());
});

hiddenCard.addEventListener("animationend", () => {
    switch(animationStage) {
        case 0:
            executeAnimationStageZero();
            break;
        case 1:
            executeAnimationStageOne();
            break;
        case 2:
            executeAnimationStageTwo();
            break;
        default:
            executeAnimationEnd();
            break;
    }
});

higherButton.addEventListener("click", () => flipHiddenCardOnClick('higher'));
lowerButton.addEventListener("click", () => flipHiddenCardOnClick('lower'));

/* ==================== FUNCTIONS ==================== */

/* -------------------- CARD FUNCTIONS -------------------- */

// Uses the Fisher–Yates shuffle algorithm
function shuffleCards() {
    console.log("Shuffling cards");
    cardArray = Array.from(cardSet.values());
    for (let index = cardArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [cardArray[index], cardArray[randomIndex]] = [cardArray[randomIndex], cardArray[index]];
    }
}

function loadNextShownCardImage(newCurrentCard) {
    currentCard = newCurrentCard;
    let usedCardElement = document.getElementById(newCurrentCard.getNumber() + newCurrentCard.getShape());
    usedCardElement.classList.add('halfOpacity')
    shownCard.src = `cards/${newCurrentCard.getName().toLowerCase().replace(/ /g, "_")}.png`;
}

function flipHiddenCardOnClick(playerSelection) {    
    if (!playingFlipAnimation) {
        playerGuessSelection = playerSelection;
        playingFlipAnimation = true;
        flipHiddenCard();
    }
}

function compareCards() {
    if (playerGuessSelection === 'higher') {
        return (currentCard.getNumber() < cardArray[0].getNumber()) ? true : false;
    } else {
        return (currentCard.getNumber() < cardArray[0].getNumber()) ? false : true;
    }
}

/* -------------------- ANIMATION STAGES -------------------- */

// Gets executed when the animation for flipping the card sideways (or 90degrees on the Y axes) ends
function executeAnimationStageZero() {
    console.log("Animation stage 0");
    hiddenCard.src = `cards/${cardArray[0].getName().toLowerCase().replace(/ /g, "_")}.png`;
    increaseAnimationStage();
    flipBackHiddenCard();
}

// Gets executed when the animation for flipping the card to reveal the card ends
function executeAnimationStageOne() {
    console.log("Animation stage 1");
    if (compareCards()) {
        setTimeout(() => {
            increaseAnimationStage();
            increaseScore();
            setHighscore();
            scoreCounter.innerHTML = score;
            flipBothCards();
        }, 500)
    } else {
        responseMessage.style.display = "block";
        setTimeout(() => {
            responseMessage.style.display = "none";
            resetGame();
        }, 2000);
    }
}

// Gets executed when the animation for flipping the revealed card back to 90 degrees on the Y axes ends
function executeAnimationStageTwo() {
    console.log("Animation stage 2");
    increaseAnimationStage();
    if (gameOver) {
        console.log("Player guessed incorrectly, reset!");
        shuffleCards();
    }
    loadNextShownCardImage(cardArray.shift());
    resetHiddenCardImage();
    flipBackBothCards();
}

// Gets executed when the animation for flipping the revealed card back to unknown ends
function executeAnimationEnd() {
    console.log("Animation default");
    if (gameOver) {
        gameOver = false;
    }
    resetAnimationStage();
    playingFlipAnimation = false;
}

/* -------------------- HELPER FUNCTIONS -------------------- */

function resetShownCardImage() {
    shownCard.src = `cards/backside.png`;
}

function resetHiddenCardImage() {
    hiddenCard.src = `cards/backside.png`;
}

function flipShownCard() {
    shownCard.style.animation = "flip .5s ease-out"; 
}

function flipHiddenCard() {
    hiddenCard.style.animation = "flip .5s ease-out"; 
}

function flipBothCards() {
    flipShownCard();
    flipHiddenCard();
}

function flipBackShownCard() {
    shownCard.style.animation = "flipBack .5s ease-in";
}

function flipBackHiddenCard() {
    hiddenCard.style.animation = "flipBack .5s ease-in";
}

function flipBackBothCards() {
    flipBackShownCard();
    flipBackHiddenCard();
}

function increaseAnimationStage() {
    animationStage++;
}

function resetAnimationStage() {
    animationStage = 0;
}

function increaseScore() {
    score++;
}

function setHighscore() {
    if (score > highscoreCounter.innerHTML) {
        highscoreCounter.innerHTML = score
    }
}

function resetScore() {
    score = 0;
}

function resetGame() {
    console.log('Resetting game');
    gameOver = true;
    resetScore();
    increaseAnimationStage();
    scoreCounter.innerHTML = score;

    resetUsedCardsOpacity();
    flipBothCards();
}

function resetUsedCardsOpacity() {
    let shownCards = document.querySelectorAll('.halfOpacity')
    for (let index = 0; index < shownCards.length; index++) {
        shownCards[index].classList.remove('halfOpacity');
    }
}