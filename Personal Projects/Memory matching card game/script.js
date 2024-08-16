// ? Defining the file path of all the images to later be shuffled and put into pairs


document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");

    // * Array of all image paths
    const cardImages = [];



    // ? Fetches the JSON data - card images
    fetch("cards.json")
        .then(response => response.json())
        .then(cardData => {
            // ? Duplicates the array to create matching pairs
            cardPair = [...cardData, ...cardData];

            // ? Shuffles the cards
            cardPair.sort(() => 0.5 - Math.random());

            // ? Creating the cards
            cardPair.forEach((cardInfo, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.name = cardInfo.name;
                card.dataset.index = index;

                // ? Create the front and back faces of cards
                const frontFace = document.createElement("div");
                frontFace.classList.add("front");

                const backFace = document.createElement("div");
                backFace.classList.add("back");

                // ? Creating an image element for the front face card
                const img = document.createElement("img");
                img.src = cardInfo.image;
                img.alt = cardInfo.name;

                // ? Appending image to the front face
                frontFace.appendChild(img);

                // ? Appending faces to card
                card.appendChild(frontFace);
                card.appendChild(backFace);

                // ? Adding card to grid container
                gridContainer.appendChild(card);

                // ? Adding event listener for card flipping
                card.addEventListener("click", handleCardFlip);
            });
        })
        // ! DeBug in-case JSON fails
        .catch(error => {
            console.error("Error fetching the JSON data:", error);
        });


    let firstCard, secondCard;
    let lockBoard = false;
    let score = 0;

    function handleCardFlip() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            // * The first card is clicked
            firstCard = this;
            return;
        }

        // * Second card clicked
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch) {
            disableCards();
            score += 1;
            document.querySelector(".score").textContent = score;
            resetBoard();
        }
        else {
            // * If the cards are not a match, flip them back after a delay
            unflipCards();
        }
    }

    function disableCards() {
        // * Removing event listiner to disable matched cards
        firstCard.removeEventListener("click", handleCardFlip);
        secondCard.removeEventListener("click", handleCardFlip);

        resetBoard();
        // lockBoard = true;
        // setTimeout(() => {
        //     firstCard.classList.remove("flipped");
        //     secondCard.classList.remove("flipped");
        //     resetBoard();
        // }, 1500);

        // ? Checks if all cards have been matched
        if (document.querySelectorAll(".card.flipped").length === document.querySelectorAll(".card").length) {
            setTimeout(() => {
                alert("Congratulations! All cards have been matched. Want to go again?")
                restart();
            }, 500);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function restart() {
        score = 0;
        document.querySelector(".score").textContent = score;
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.classList.remove("flipped");
            card.addEventListener("click", handleCardFlip);
        });

        // ? Fetches the cards after restart and reshuffles them
        fetch("cards.json")
            .then(response => response.json())
            .then(cardData => {
                const cardPair = [...cardData, ...cardData];
                cardPair.sort(() => 0.5 - Math.random());

                cards.forEach((card, index) => {
                    const cardInfo = cardPair[index];
                    card.dataset.name = cardInfo.name;
                    card.querySelector(".front img").src = cardInfo.image;
                    card.querySelector(".front img").alt = cardInfo.name;
                });
            })
            .catch(error => {
                console.error("Error fetching the JSON data:", error);
            });

        cardData.sort(() => 0.5 - Math.random());
        cards.forEach((card, index) => {
            card.dataset.name = cardData[index];
            // card.querySelector(".back").textContent = cardData[index];
            card.querySelector(".front").style.backgroundImage = `url(${cardData[index]})`;
        });

        resetBoard();
    }

    // ? adding event listener to the restart button to call the restart function
    document.querySelector("button").addEventListener("click", restart);

});