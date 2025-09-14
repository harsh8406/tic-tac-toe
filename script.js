const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const newGameBtn = document.getElementById("newGame");

const overlay = document.getElementById("overlay");
const resultText = document.getElementById("resultText");
const overlayNewGameBtn = document.getElementById("overlayNewGame");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const wins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  boardEl.innerHTML = "";
  board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    boardEl.appendChild(cell);
  });
}

function handleClick(e) {
  const i = e.target.dataset.index;
  if (board[i] || gameOver) return;

  board[i] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    showOverlay(`${currentPlayer} Wins!`);
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    showOverlay("It's a Draw!");
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const combo of wins) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(combo);
      return true;
    }
  }
  return false;
}

function highlightWin(combo) {
  combo.forEach(i => {
    boardEl.children[i].classList.add("win");
  });
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
  overlay.classList.add("hidden");
  createBoard();
}

function showOverlay(message) {
  resultText.textContent = message;
  overlay.classList.remove("hidden");
}

// Events
newGameBtn.addEventListener("click", resetGame);
overlayNewGameBtn.addEventListener("click", resetGame);

// Init
createBoard();
statusEl.textContent = `Player ${currentPlayer}'s turn`;
