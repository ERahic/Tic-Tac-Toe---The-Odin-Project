// DOM REFERENCE TO FOLLOW DRY PROTOCOL
const domReference = (function () {
  gridContainer = document.querySelector("#gameBoard-container");
  player1Input = document.querySelector("#player1");
  player2Input = document.querySelector("#player2");
  startButton = document.querySelector("#startBtn");
  resetButton = document.querySelector("#resetBtn");

  return {
    gridContainer,
    player1Input,
    player2Input,
    startButton,
    resetButton,
  };
})();

// Generate Gameboard
const gameBoard = (function () {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  //Render the grid
  const render = function () {
    gameBoardArray.forEach((square, index) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.id = `Square-${index}`;
      domReference.gridContainer.appendChild(squareDiv);
    });
  };
  return { render };
})();

// Create the names for each player and assign them their marks
const playerModule = (function () {
  let player1;
  let player2;

  const createPlayers = function (name, mark) {
    return { name, mark };
  };

  const initializePlayers = () => {
    player1 = createPlayers(domReference.player1Input.value.trim(), "X");
    player2 = createPlayers(domReference.player2Input.value.trim(), "O");
  };

  const receivePlayers = () => ({ player1, player2 });

  return { initializePlayers, receivePlayers };
})();

// Have the first round be random and change the player
const playerTurnModule = (function () {
  let players = [];
  let currentPlayerIndex = 0;

  const initializePlayers = function (player1, player2) {
    players = [player1, player2];
    currentPlayerIndex = Math.random() < 0.5 ? 0 : 1;
  };

  const currentPlayer = function () {
    return players[currentPlayerIndex];
  };

  const playerTurn = function () {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return { initializePlayers, currentPlayer, playerTurn };
})();

// Generate grid when clicking on start game
const beginGame = (function () {
  // Start the game
  domReference.startButton.addEventListener("click", () => {
    console.log("Start Button Clicked");
    playerModule.initializePlayers();
    const { player1, player2 } = playerModule.receivePlayers();
    // Check if there are names entered for both inputs
    if (player1.name === "" || player2.name === "") {
      alert("ERROR! Please Enter The Name For Both Players");
      console.log("ERROR! Please Enter The Name For Both Players");
    } else {
      alert(
        `Begin The Game! ${player1.name} (${player1.mark}) vs ${player2.name} (${player2.mark})`
      );
      console.log("Game Has Begun!");
      console.log(
        `${player1.name} (${player1.mark}) vs ${player2.name} (${player2.mark})`
      );
      // Render the gameboard and disable the input fields
      gameBoard.render();
      startButton.style.display = "none";
      domReference.player1Input.disabled = true;
      domReference.player2Input.disabled = true;
      //Player Turn
      playerTurnModule.initializePlayers(player1, player2);
      const firstTurn = playerTurnModule.currentPlayer();
      alert(
        `${firstTurn.name} Will Go First! Place Your "${firstTurn.mark}" On An Empty Square!`
      );
      console.log(
        `${firstTurn.name} Will Go First! Place Your "${firstTurn.mark}" On An Empty Square!`
      );
      // Click on squares to mark "X" or "O" depending on whose turn it is
      const squareClicked = function () {
        const squares = document.querySelectorAll(".square");
        for (const square of squares) {
          square.addEventListener("click", function (e) {
            const chosenSquare = e.target;
            // Check if chosen square is already marked
            if (chosenSquare.innerHTML !== "") {
              alert(`Square Already Marked! Choose An Empty Square!`);
              console.log(`Square Already Marked! Choose An Empty Square!`);
              return;
            }
            // Current player will place thier mark on the empty square
            const currentPlayer = playerTurnModule.currentPlayer();
            chosenSquare.innerHTML = currentPlayer.mark;
            console.log(`"${currentPlayer.mark}" Placed on ${chosenSquare.id}`);
            // Change players after square is marked
            playerTurnModule.playerTurn();
            console.log(
              `${playerTurnModule.currentPlayer().name}'s Turn Is Next!`
            );
          });
        }
      };
      squareClicked();
    }
  });
  return { startButton };
})();

// Reset the Game function
const resetGame = (function () {
  domReference.resetButton.addEventListener("click", function () {
    console.log("Reset Button Clicked");
    domReference.player1Input.disabled = false;
    domReference.player2Input.disabled = false;
    domReference.player1Input.value = "";
    domReference.player2Input.value = "";
    domReference.gridContainer.innerHTML = "";
    beginGame.startButton.style.display = "flex";
  });
})();
