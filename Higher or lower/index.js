const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");

const guessCard = document.getElementById("guessCard");
const prevCard = document.getElementById("prevCard");

const cards = [];

function flipGuessCard() {
    guessCard.className = "animation";
}

guessCard.addEventListener("animationend", () => {
    guessCard.classList.remove("animation");
})