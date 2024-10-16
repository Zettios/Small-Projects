import { clubCards, diamondCards, heartCards, spadeCards } from "../classes/CardDeck.js";

/*  This class is responsible for creating the elements for the used cards. 
    Uses the cards from the CardDeck.js to generate these.
*/

window.addEventListener("load", () => {
    console.log("Page loaded");
    const spadeCardsRow = document.getElementById("spadeCards");
    const clubCardsRow = document.getElementById("clubCards");
    const heartCardsRow = document.getElementById("heartCards");
    const diamondCardsRow = document.getElementById("diamondCards");
    
    for (let index = 0; index < clubCards.size; index++) {
        var spadeCard = spadeCards.get(`${index+2}Spades`);
        var heartCard = heartCards.get(`${index+2}Hearts`);
        var clubCard = clubCards.get(`${index+2}Clubs`);
        var diamondCard = diamondCards.get(`${index+2}Diamonds`);
        
        createUsedCardsImage(spadeCard, spadeCardsRow);
        createUsedCardsImage(heartCard, heartCardsRow);
        createUsedCardsImage(clubCard, clubCardsRow);
        createUsedCardsImage(diamondCard, diamondCardsRow);
    }
})

function createUsedCardsImage(card, parentElement) {
    const childElement = document.createElement("img");
    childElement.id = `${card.getNumber()}${card.getShape()}`;
    childElement.src = `cards/${card.getName().toLowerCase().replace(/ /g, "_")}.png`;
    childElement.alt = `${card.getName().charAt(0)}${card.getUnicode()}`;
    childElement.ariaLabel = card.getName();
    childElement.title = card.getName();

    parentElement.appendChild(childElement);
}