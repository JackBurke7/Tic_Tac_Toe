// Constants
const players = ['X', 'O'];
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 0;
let boardArray = new Array(9).fill('');

// Event Listeners
board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

// Functions
function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);
  if (boardArray[index] === '' && !message.textContent.includes('wins')) {
    boardArray[index] = players[currentPlayer];
    cell.textContent = players[currentPlayer];
    currentPlayer = 1 - currentPlayer; // Switch player
    updateGameStatus();
  }
}

function updateGameStatus() {
    const winner = checkForWin();
  
    if (winner) {
      if (winner === 'tie') {
        message.textContent = "It's a tie!";
      } else {
        message.textContent = `Player ${winner} wins!`;
      }
    } else {
      message.textContent = `Player ${players[currentPlayer]}'s turn`;
    }
  }
  

function checkForWin() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        boardArray[a] === players[0] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        return players[0]; // Player X wins
      } else if (
        boardArray[a] === players[1] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        return players[1]; // Player O wins
      }
    }
  
    if (boardArray.every((cell) => cell !== '')) {
      return 'tie';
    }
  
    return null;
  }
  
  

function resetGame() {
  boardArray = new Array(9).fill('');
  currentPlayer = 0;
  cells.forEach((cell) => (cell.textContent = ''));
  message.textContent = `Player ${players[currentPlayer]}'s turn`;
}

resetGame();
