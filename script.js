// Generate Gameboard
const gameBoard = (function () {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  //Render the grid
  const render = function () {
    const gridContainer = document.querySelector("#gameBoard-container");
    gameBoardArray.forEach((square, index) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.id = `square-${index}`;
      gridContainer.appendChild(squareDiv);
    });
  };
  return { render };
})();

// Generate grid when clicking on start game
const beginGame = (function () {
  const startButton = document.querySelector("#startBtn");
  startButton.addEventListener("click", () => {
    console.log("Start Button Clicked");
    const player1 = document.querySelector("#player1").value.trim();
    const player2 = document.querySelector("#player2").value.trim();
    if (player1 === "" || player2 === "") {
      alert("ERROR! Please Enter The Name For Both Players");
      console.log("ERROR! Please Enter The Name For Both Players");
    } else {
      alert("Begin The Game!");
      console.log("Game Begin");
      console.log(`${player1} vs ${player2}`);
      gameBoard.render();
      startButton.style.display = "none";
      document.querySelector("#player1").disabled = true;
      document.querySelector("#player2").disabled = true;
    }
  });
  return { startButton };
})();

// Reset the Game function
const resetGame = (function () {
  const resetButton = document.querySelector("#resetBtn");
  resetButton.addEventListener("click", function () {
    console.log("Reset Button Clicked");
    document.querySelector("#player1").disabled = false;
    document.querySelector("#player2").disabled = false;
    player1.value = "";
    player2.value = "";
    document.querySelector("#gameBoard-container").innerHTML = "";
    beginGame.startButton.style.display = "flex";
  });
})();
