// Konstante zum aktuellen Spielstatus
const statusDisplay = document.querySelector('.game--status');

// Variable wenn das Spiel vorbei ist, zu false initialisieren 
let gameActive = true;

// Spielstatus (Spielfeld)
let gameState = ["", "", "", "", "", "", "", "", ""];

// Spielerauswahl
if(window.confirm("Soll X starten?") == true) {
	var currentPlayer = 'X';
} else {
	var currentPlayer = 'O';
}

// Messages
const winningMessage = () => `Spieler ${currentPlayer} hat gewonnen!`;
const drawMessage = () => `Spiel endet unentschieden!`;
const currentPlayerTurn = () => `Spieler ${currentPlayer} ist dran!`;

// Statusanzeige welcher Spieler dran ist
statusDisplay.innerHTML = currentPlayerTurn(); 

// Gewinnkombinationen
var winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Zelle geklickt, Parameter der geklickten Zelle und Index
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Spielstatus entspricht den aktuellen Spieler
    gameState[clickedCellIndex] = currentPlayer;
    // Zeichen je nach Spieler setzen
    clickedCell.innerHTML = currentPlayer;
}

// Spieler tauschen
function handlePlayerChange() {
    // Wenn currentPlayer ist X, wechsel zu O, sonst bleib bei X
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
    // // Statusanzeige welcher Spieler dran ist
    statusDisplay.innerHTML = currentPlayerTurn(); 
}

// Funktion Highlight
function HighlightCell() {

}

// Ergebnis validieren
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Klick auf Zelle
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Neustart
function handleRestartGame() {
	gameActive = true;
	currentPlayer = "X";
	gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));