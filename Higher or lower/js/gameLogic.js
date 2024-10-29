import { clubCards, diamondCards, heartCards, spadeCards } from "../classes/CardDeck.js";

const failureMessage = document.getElementById("failureMessage");
const successMessage = document.getElementById("successMessage");
const shownCard = document.getElementById("shownCard");
const hiddenCard = document.getElementById("hiddenCard");
const scoreCounter = document.getElementById("scoreCounter");
const highscoreCounter = document.getElementById("highscoreCounter");

const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");

// const cardSet = new Map([...spadeCards].splice(0,3));
// const tempArr1 = [...spadeCards].splice(0,3);
// const tempArr2 = [...heartCards].splice(0,3);
// const cardSet = new Map([...tempArr1, ...tempArr2]);
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
    console.log(cardArray);
});

hiddenCard.addEventListener("animationend", () => {
    switch(animationStage) {
        case 0:
            executeStageZeroAnimationEnd();
            break;
        case 1:
            executeStageOneAnimationEnd();
            break;
        case 2:
            executeStageTwoAnimationEnd();
            break;
        default:
            executeFinalAnimationEnd();
            break;
    }
});

higherButton.addEventListener("click", () => flipHiddenCardOnClick('higher'));
lowerButton.addEventListener("click", () => flipHiddenCardOnClick('lower'));

/* ==================== FUNCTIONS ==================== */

/* -------------------- CARD FUNCTIONS -------------------- */

// Uses the Fisher–Yates shuffle algorithm
function shuffleCards() {
    cardArray = Array.from(cardSet.values());
    for (let index = cardArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [cardArray[index], cardArray[randomIndex]] = [cardArray[randomIndex], cardArray[index]];
    }

    fixConsecutiveDuplicates();
}

function fixConsecutiveDuplicates() {
    for (let cardArrayIndex = 1; cardArrayIndex < cardArray.length; cardArrayIndex++) {
        if (cardArray[cardArrayIndex].getNumber() === cardArray[cardArrayIndex - 1].getNumber()) {
            for (let j = cardArrayIndex + 1; j < cardArray.length; j++) {
                if (cardArray[j].getNumber() !== cardArray[cardArrayIndex].getNumber()) {
                    [cardArray[cardArrayIndex], cardArray[j]] = [cardArray[j], cardArray[cardArrayIndex]];
                    break;
                }
            }
        }
    }

    // Checks if the last two values are the same
    // If so, swaps it around to a valid position
    if (cardArray[cardArray.length - 1].getNumber() === cardArray[cardArray.length - 2].getNumber()) {
        const leftVal = cardArray[cardArray.length - 3].getNumber();
        const currentVal = cardArray[cardArray.length - 2].getNumber();
        const rightVal = cardArray[cardArray.length - 1].getNumber();

        for (let index = (cardArray.length - 3); index > 0; index--) {
            let canSwap = false;
            let swapLeftVal = cardArray[index - 1].getNumber();
            let swapCurrentVal = cardArray[index].getNumber();
            let swapRightVal = cardArray[index + 1].getNumber();

            (swapLeftVal !== currentVal && swapRightVal !== currentVal) ? canSwap = true : canSwap = false;
            (leftVal !== swapCurrentVal && rightVal !== swapCurrentVal) ? canSwap = true : canSwap = false;

            if(canSwap) {
                [cardArray[cardArray.length - 2], cardArray[index]] = [cardArray[index], cardArray[cardArray.length - 2]];
                break;
            }
        }
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
    switch(playerGuessSelection) {
        case 'higher':
            return (currentCard.getNumber() < cardArray[0].getNumber()) ? true : false;
        case 'lower':
            return (currentCard.getNumber() > cardArray[0].getNumber()) ? true : false;
        default:
            return false;
    }
}

function checkWinState() {
    return (cardArray.length <= 1) ? true : false;
}

/* -------------------- ANIMATION STAGES -------------------- */

// Gets executed when the animation for flipping the card sideways (or 90degrees on the Y axes) ends
function executeStageZeroAnimationEnd() {
    hiddenCard.src = `cards/${cardArray[0].getName().toLowerCase().replace(/ /g, "_")}.png`;
    increaseAnimationStage();
    flipBackHiddenCard();
}

// Gets executed when the animation for flipping the card to reveal the card ends
function executeStageOneAnimationEnd() {
    if (compareCards()) {        
        if (checkWinState()) {
            updatePlayerScore();
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
                resetGame();
            }, 2000);
        } else {
            updatePlayerScore();
            setTimeout(() => {
                increaseAnimationStage();
                flipBothCards();
            }, 500)
        }
    } else {
        failureMessage.style.display = "block";
        resetScore();
        setTimeout(() => {
            failureMessage.style.display = "none";
            resetGame();
        }, 2000);
    }
}

// Gets executed when the animation for flipping the revealed card back to 90 degrees on the Y axes ends
function executeStageTwoAnimationEnd() {
    increaseAnimationStage();
    if (gameOver) {
        shuffleCards();
        gameOver = false;
    }
    loadNextShownCardImage(cardArray.shift());
    resetHiddenCardImage();
    flipBackBothCards();
}

// Gets executed when the animation for flipping the revealed card back to unknown ends
function executeFinalAnimationEnd() {
    resetAnimationStage();
    playingFlipAnimation = false;
}

/* -------------------- HELPER FUNCTIONS -------------------- */

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

function updatePlayerScore() {
    score++;
    scoreCounter.innerHTML = score;
    if (score > highscoreCounter.innerHTML) {
        highscoreCounter.innerHTML = score
    }
}

function resetScore() {
    score = 0;
    scoreCounter.innerHTML = score;
}

function resetGame() {
    gameOver = true;
    increaseAnimationStage();
    resetUsedCardsOpacity();
    flipBothCards();
}

function resetUsedCardsOpacity() {
    const shownCards = document.querySelectorAll('.halfOpacity')
    for (let index = 0; index < shownCards.length; index++) {
        shownCards[index].classList.remove('halfOpacity');
    }
}