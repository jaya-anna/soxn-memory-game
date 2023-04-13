document.addEventListener("DOMContentLoaded", () => {
  //card options
  const cardArray = [
    {
      name: "leo-white",
      img: "images/image1.jpeg",
    },
    {
      name: "leo-white",
      img: "images/image1.jpeg",
    },
    {
      name: "leo-yellow",
      img: "images/image2.jpeg",
    },
    {
      name: "leo-yellow",
      img: "images/image2.jpeg",
    },
    {
      name: "leo-red",
      img: "images/image3.jpeg",
    },
    {
      name: "leo-red",
      img: "images/image3.jpeg",
    },
    {
      name: "banana",
      img: "images/image4.jpeg",
    },
    {
      name: "banana",
      img: "images/image4.jpeg",
    },

    {
      name: "skate",
      img: "images/image7.jpeg",
    },
    {
      name: "skate",
      img: "images/image7.jpeg",
    },
    {
      name: "wave",
      img: "images/image8.jpeg",
    },
    {
      name: "wave",
      img: "images/image8.jpeg",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const gameText = document.querySelector(".info-text");
  const restartBtn = document.querySelector(".restart");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // create board
  function createBoard() {
    const voucherImage = document.querySelector(".voucher-image");
    if (voucherImage) {
      grid.removeChild(voucherImage);
    }
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "images/image-blank.jpg");
      card.setAttribute("data-id", i);
      card.setAttribute("class", "card");
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
    gameText.textContent = "Start playing!";
    resultDisplay.textContent = "0 %";
  }

  // check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/image-blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/image-blank.jpg");
      gameText.textContent = "You have clicked the same image!";
    } else if (cardsChosen[0] === cardsChosen[1]) {
      gameText.textContent = "You found a match!";
      cards[optionOneId].setAttribute("src", "images/background.jpg");
      cards[optionTwoId].setAttribute("src", "images/background.jpg");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      const currentScore = cardsWon.length * 16.66;
      resultDisplay.textContent = Math.floor(currentScore) + " %";
    } else {
      cards[optionOneId].setAttribute("src", "images/image-blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/image-blank.jpg");
      gameText.textContent = "Sorry, try again.";
    }
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
      grid.innerHTML = "";
      gameText.textContent = "Congratulations! You found them all! ";
      resultDisplay.textContent = "100 %";
      const voucherImage = new Image();
      voucherImage.src = "images/gutschein.jpg";
      grid.appendChild(voucherImage);
      restartBtn.addEventListener("click", handleRestart);
    }
  }

  // flip your card
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  //restart game
  function handleRestart() {

    const voucherImage = document.querySelector(".voucher-image");
    if (voucherImage) {
      grid.removeChild(voucherImage);
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => grid.removeChild(card));

    cardsWon = [];
    cardsChosen = [];
    cardsChosenId = [];

    createBoard();
    gameText.textContent = "Start playing!";
  }

  createBoard();
  restartBtn.addEventListener("click", handleRestart);
});
