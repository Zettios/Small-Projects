const clubUniCode = "\u{2663}";
const diamondUniCode = "\u{2666}";
const heartUniCode = "\u{2665}";
const spadeUniCode = "\u{2660}";

const clubAceTitle = "Ace of Clubs";
const clubNumberTitle = " of Clubs"

const diamondAceTitle = "Ace of Diamonds";
const diamondNumberTitle = " of Diamonds";

const heartAceTitle = "Ace of Hearts";
const heartNumberTitle = " of Hearts";

const spadeAceTitle = "Ace of Spades";
const spadeNumberTitle = " of Spades";


window.addEventListener("load", () => {
    console.log("Page loaded");
    const clubCards = document.getElementById("clubCards");
    const diamondCards = document.getElementById("diamondCards");
    const heartCards = document.getElementById("heartCards");
    const spadeCards = document.getElementById("spadeCards");

    for (let index = 0; index <= 12; index++) {
        switch(true) {
            case (index == 0):
                createUsedCardsImage(`cards/ace_of_clubs.png`, 
                    `A${clubUniCode}`, clubAceTitle, clubCards);

                createUsedCardsImage(`cards/ace_of_diamonds.png`, 
                    `A${diamondUniCode}`, diamondAceTitle, diamondCards);

                createUsedCardsImage(`cards/ace_of_hearts.png`, 
                    `A${heartUniCode}`, heartAceTitle, heartCards);

                createUsedCardsImage(`cards/ace_of_spades.png`, 
                    `A${spadeUniCode}`, spadeAceTitle, spadeCards);
                break;
            case (index < 10):
                createUsedCardsImage(`cards/${index+1}_of_clubs.png`, 
                    `${index+1}${clubUniCode}`, `${index+1}${clubNumberTitle}`, 
                    clubCards);

                createUsedCardsImage(`cards/${index+1}_of_diamonds.png`, 
                    `${index+1}${diamondUniCode}`, `${index+1}${diamondNumberTitle}`, 
                    diamondCards);

                createUsedCardsImage(`cards/${index+1}_of_hearts.png`, 
                    `${index+1}${heartUniCode}`, `${index+1}${heartNumberTitle}`, 
                    heartCards);

                createUsedCardsImage(`cards/${index+1}_of_spades.png`, 
                    `${index+1}${spadeUniCode}`, `${index+1}${spadeNumberTitle}`, 
                    spadeCards);
                break;
            case (index == 10):
                createUsedCardsImage(`cards/jack_of_clubs.png`, 
                    `J${clubUniCode}`, `Jack${clubNumberTitle}`, clubCards);

                createUsedCardsImage(`cards/jack_of_diamonds.png`, 
                    `J${diamondUniCode}`, `Jack${diamondNumberTitle}`, diamondCards);

                createUsedCardsImage(`cards/jack_of_hearts.png`, 
                    `J${heartUniCode}`, `Jack${heartNumberTitle}`, heartCards);

                createUsedCardsImage(`cards/jack_of_spades.png`, 
                    `J${spadeUniCode}`, `Jack${spadeNumberTitle}`, spadeCards);
                break;
            case (index == 11):
                createUsedCardsImage(`cards/queen_of_clubs.png`, 
                    `Q${clubUniCode}`, `Queen${clubNumberTitle}`, clubCards);

                createUsedCardsImage(`cards/queen_of_diamonds.png`, 
                    `Q${diamondUniCode}`, `Queen${diamondNumberTitle}`, diamondCards);

                createUsedCardsImage(`cards/queen_of_hearts.png`, 
                    `Q${heartUniCode}`, `Queen${heartNumberTitle}`, heartCards);

                createUsedCardsImage(`cards/queen_of_spades.png`, 
                    `Q${spadeUniCode}`, `Queen${spadeNumberTitle}`, spadeCards);
                break;
            case (index == 12):
                createUsedCardsImage(`cards/king_of_clubs.png`, 
                    `K${clubUniCode}`, `King${clubNumberTitle}`, clubCards);

                createUsedCardsImage(`cards/king_of_diamonds.png`, 
                    `K${diamondUniCode}`, `King${diamondNumberTitle}`, diamondCards);

                createUsedCardsImage(`cards/king_of_hearts.png`, 
                    `K${heartUniCode}`, `King${heartNumberTitle}`, heartCards);

                createUsedCardsImage(`cards/king_of_spades.png`, 
                    `K${spadeUniCode}`, `King${spadeNumberTitle}`, spadeCards);
                break;
        }
    }
})

function createUsedCardsImage(srcImage, altText, imgTitle, parentElement) {
    const childElement = document.createElement("img");
    childElement.src = srcImage;
    childElement.alt = altText;
    childElement.ariaLabel = imgTitle;
    childElement.title = imgTitle;

    parentElement.appendChild(childElement);
}