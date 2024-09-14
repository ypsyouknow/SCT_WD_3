let currentPlayer = "X";
let gameActive = true;

function markCell(cell) {
    if (cell.textContent === "" && gameActive && currentPlayer === "X") {
        cell.textContent = 'X';  
        cell.style.color = 'white';
        if (checkWinner()) {
            alert("Player Wins !!!");
            resetGame();
        } else if (isDraw()) {
            alert("Draw !!!");
            resetGame();
        } else {
            currentPlayer = "O";  // Switch to computer's turn
            setTimeout(computerMove, 500);  // Delay for computer's move
        }
    }
}

function computerMove() {
    const boxes = document.querySelectorAll('#container div');
    const emptyCells = Array.from(boxes).filter(cell => cell.textContent === '');
    
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O'; 
        emptyCells[randomIndex].style.color = 'white'; 
    }
    
    if (checkWinner()) {
        alert("Computer Wins !!!");
        resetGame();
    } else if (isDraw()) {
        alert("Draw !!!");
        resetGame();
    } else {
        currentPlayer = "X";  // Switch back to player's turn
    }
}

function checkWinner() {
    const boxes = document.querySelectorAll('#container div');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]             
    ];
    
    return winningCombos.some(combo => {
        return boxes[combo[0]].textContent !== '' &&
               boxes[combo[0]].textContent === boxes[combo[1]].textContent &&
               boxes[combo[0]].textContent === boxes[combo[2]].textContent;
    });
}

function isDraw() {
    const boxes = document.querySelectorAll('#container div');
    return Array.from(boxes).every(cell => cell.textContent !== '');
}

function resetGame() {
    const boxes = document.querySelectorAll('#container div');
    boxes.forEach(box => box.textContent = ''); 
    boxes.forEach(box => box.style.color = 'transparent'); 
    currentPlayer = 'X';  // Player always starts as 'X'
    gameActive = true;
}