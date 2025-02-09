// DOM Elements
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

// Sounds(optional)
const clickSound = new Audio('click.mp3'); // Sound when a cell is clicked
const winSound = new Audio('win.mp3');    // Sound when someone wins
const drawSound = new Audio('draw.mp3');  // Sound for a draw

// Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Create the board dynamically
function createBoard() {
  board.innerHTML = '';
  gameState.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const index = event.target.dataset.index;

  // Ignore clicks on already taken cells
  if (!gameState[index] && gameActive) {
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');
    clickSound.play(); // Play click sound
    checkWinner();
    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Check for winner or draw
function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      highlightWinningCells(combo);
      status.textContent = `🎉 Player ${gameState[a]} wins!`;
      winSound.play(); // Play winning sound
      return;
    }
  }

  // Check for draw
  if (!gameState.includes(null)) {
    gameActive = false;
    status.textContent = '🤝 It\'s a draw!';
    drawSound.play(); // Play draw sound
  }
}

// Highlight winning cells
function highlightWinningCells(combo) {
  combo.forEach(index => {
    const cell = board.children[index];
    cell.style.backgroundColor = 'rgba(72, 239, 128, 0.8)'; // Green for winning cells
    cell.style.color = '#fff';
    cell.style.fontWeight = 'bold';
    cell.style.transform = 'scale(1.1)';
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

// Initialize the board
createBoard();
