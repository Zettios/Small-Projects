import { clubCards, diamondCards, heartCards, spadeCards } from "../classes/CardDeck.js";

const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");

const hiddenCard = document.getElementById("hiddenCard");
const shownCard = document.getElementById("shownCard");

const cardSet = new Map([...clubCards, ...diamondCards, ...heartCards, ...spadeCards]);
const cardArray = Array.from(cardSet.values());

let currentCard = undefined;
let showingCard = false;
let revealing = false;

window.addEventListener("load", () => {
    shuffleCards();
    loadHiddenCardImage();
});

higherButton.addEventListener("click", () => flipGuessCard('higher'));
lowerButton.addEventListener("click", () => flipGuessCard('lower'))

function loadHiddenCardImage() {
    // if (cardArray.length > 0) {
    //     hiddenCard.src = `cards/${cardArray[0].getName().toLowerCase().replace(/ /g, "_")}.png`;
    // } else {
        hiddenCard.src = `cards/backside.png`;
    //}
}

function loadCurrentCardImage(newCurrentCard) {
    currentCard = newCurrentCard;
    let usedCardElement = document.getElementById(newCurrentCard.getNumber() + newCurrentCard.getShape());
    usedCardElement.style.opacity = "0.5";
    
    shownCard.src = `cards/${newCurrentCard.getName().toLowerCase().replace(/ /g, "_")}.png`;
}

function shuffleCards() {
    for (let index = cardArray.length - 1; index > 0; index--) {
        const rng = Math.random();
        const random = Math.floor(rng * (index + 1));
        [cardArray[index], cardArray[random]] = [cardArray[random], cardArray[index]];
    }

    loadCurrentCardImage(cardArray.shift());
}

function flipGuessCard(guessType) {
    if (!revealing) {
        revealing = !revealing;
        guessCard.style.animation = "flip .5s ease-out";
    }
    // if (guessType === 'higher') {
    //     if(currentCard.getNumber() < cardArray[0].getNumber()) {
    //         console.log(`Correct! ${cardArray[0].getName()} is higher than ${currentCard.getName()}`);
    //     } else {
    //         console.log(`WRONG! ${cardArray[0].getName()} is not higher than ${currentCard.getName()}`);
    //     }
    // } else {
    //     if(currentCard.getNumber() < cardArray[0].getNumber()) {
    //         console.log(`WRONG! ${cardArray[0].getName()} is not lower than ${currentCard.getName()}`);
    //     } else {
    //         console.log(`Correct! ${cardArray[0].getName()} is lower than ${currentCard.getName()}`);
    //     }
    // }
    
    
    // loadCurrentCardImage(cardArray.shift());
    // loadHiddenCardImage();
}

guessCard.addEventListener("animationend", () => {
    if (!showingCard) {
        hiddenCard.src = `cards/${cardArray[0].getName().toLowerCase().replace(/ /g, "_")}.png`;
        guessCard.style.animation = "flipBack .5s ease-in";
        showingCard = !showingCard;
    } else {
        guessCard.style.animation = "";
        showingCard = !showingCard;
        setTimeout(() => {
            loadCurrentCardImage(cardArray.shift());
            loadHiddenCardImage();
            revealing = !revealing;
        }, 1000)
    }
})