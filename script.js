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
      squareDiv.id = `square-${index}`;
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

// Generate grid when clicking on start game
const beginGame = (function () {
  domReference.startButton.addEventListener("click", () => {
    console.log("Start Button Clicked");
    playerModule.initializePlayers();
    const { player1, player2 } = playerModule.receivePlayers();
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
      gameBoard.render();
      startButton.style.display = "none";
      domReference.player1Input.disabled = true;
      domReference.player2Input.disabled = true;
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
