const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateBoard(index) {
    if (board[index] !== '' || isGameOver) {
        return;
    }
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    if (checkWin()) {
        statusText.innerText = `${currentPlayer} Wins!`;
        isGameOver = true;
    } else if (checkDraw()) {
        statusText.innerText = "It's a Draw!";
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => (cell.innerText = ''));
    currentPlayer = 'X';
    isGameOver = false;
    statusText.innerText = `${currentPlayer}'s Turn`;
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        updateBoard(index);
    });
});

resetButton.addEventListener('click', resetGame);

statusText.innerText = `${currentPlayer}'s Turn`;
