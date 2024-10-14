const card = document.getElementById("card");
const animationSpeed = 1;

var animationFlipped = false;
var showingBackSide = true;


card.addEventListener("animationend", () => {
    if (!animationFlipped) {
        animationFlipToHide();
    } else {
        animationHideToFlip();
    }
});

function animationFlipToHide() {
    card.style.transform = "rotateY(90deg)";
    if (showingBackSide) {
        card.style.backgroundImage = "url('clubs.png')"
    } else {
        card.style.backgroundImage = "url('cardbackside.png')"
    }
    showingBackSide = !showingBackSide;
    animationFlipped = true
    card.style.animation = `cardFlipBack ${animationSpeed}s`;
}

function animationHideToFlip() {
    card.style.transform = "rotateY(0deg)";
    animationFlipped = false;
    card.style.animation = `cardFlip ${animationSpeed}s`;
}