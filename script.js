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
      squareDiv.id = `${index}`;
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

// Check for winner of the game
const checkWinnerModule = (function () {
  const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const trackForWinner = function (playerSquareIndex) {
    // Checks if at least one of the combos of winArray directly matches with the playerSquareIndex
    return winArray.some(function (combo) {
      // Checks if the indexes of playerSquareIndex does exist in the winArray combos
      return combo.every(function (index) {
        // Checks if the playerSquareIndex includes indexes for each combination of winArray
        return playerSquareIndex.includes(index);
      });
    });
  };
  return { trackForWinner };
})();

// Generate grid when clicking on start game
const startGame = (function () {
  // Start the game
  domReference.startButton.addEventListener("click", () => {
    console.log("Start Button Clicked");
    playerModule.initializePlayers();

    // Retrieve players from playerModule
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

      // Determine who goes first based on which player's index was randomly chosen
      const firstTurn = playerTurnModule.currentPlayer();

      alert(
        `${firstTurn.name} Will Go First! Place Your "${firstTurn.mark}" On An Empty Square!`
      );

      console.log(
        `${firstTurn.name} Will Go First! Place Your "${firstTurn.mark}" On An Empty Square!`
      );

      // Arrays to keep track of each player's chosen square (index) to match the winning array
      let player1SquareIndex = [];
      let player2SquareIndex = [];

      // Track how many moves have been made (if 9 moves were made, then its a draw)
      let totalMoves = 0;

      // Click on squares to mark "X" or "O" depending on whose turn it is
      const squareClicked = function () {
        const squares = document.querySelectorAll(".square");

        for (const square of squares) {
          square.addEventListener("click", function (e) {
            const chosenSquare = e.target;
            const chosenSquareIndex = Number(chosenSquare.id);

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

            // Boolean to track the winner of the game
            let winner = false;

            // Check if the mark is either "X" or "O" to add the chosen square's index into the player's square index array
            if (currentPlayer.mark === "X") {
              player1SquareIndex.push(chosenSquareIndex);

              // Check if player 1 has the winning combo
              winner = checkWinnerModule.trackForWinner(player1SquareIndex);
            } else {
              player2SquareIndex.push(chosenSquareIndex);

              // Check if player 2 has the winning combo
              winner = checkWinnerModule.trackForWinner(player2SquareIndex);
            }

            // Increment total moves after a player has chosen a square for their mark
            totalMoves++;
            console.log(`Total Moves: ${totalMoves} out of 9`);

            // If the total moves of the game go to 9, then it's a draw
            if (totalMoves === 9) {
              alert(`Game Over! It's A Draw!`);
              console.log(`Game Over! It's A Draw!`);
              endGame.disableSquareClick();
              return;
            }

            // Check if there is a winner
            if (winner) {
              alert(`Game Over! ${currentPlayer.name} Wins The Game!`);
              console.log(`Game Over! ${currentPlayer.name} Wins The Game!`);
              endGame.disableSquareClick();
              return;
            }

            // Change players after square is marked and there's no winner or if there are more moves to play
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
})();

// Disable clicks on squares after the game is declared a draw or if there is a winner
const endGame = (function () {
  const disableSquareClick = function () {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
      square.style.pointerEvents = "none";
    }
    console.log(`Game Is Over! Please Click On Reset Game To Play Again!`);
  };
  return { disableSquareClick };
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
    domReference.startButton.style.display = "flex";
  });
})();
