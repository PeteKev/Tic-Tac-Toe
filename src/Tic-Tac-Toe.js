// Konstante zum aktuellen Spielstatus
const statusDisplay = document.querySelector('.game--status');

// Variable wenn das Spiel vorbei ist, zu false initialisieren 
// let
let gameActive = true;

// Spielstatus "leer"
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
function changeColor() {
    var color = document.getElementsByClassName('game--container');
    // if
        if(color.value === 'X') {
            color.claasList.add('xWin');
        }
}

// Ergebnis validieren
function handleResultValidation() {
    // roundWon auf false setzen
    let roundWon = false;
    // Kontrolle, ob ein Spieler gewonnen hat
    for (let i = 0; i <= 7; i++) {
        // winConditions entspricht den jeweiligen Arrys von winningConditions
        const winCondition = winningConditions[i];
        // Ersten Bereich des jeweiligen Arrays prüfen
        let a = gameState[winCondition[0]];
        // Zweiten Bereich des jeweiligen Arrays prüfen
        let b = gameState[winCondition[1]];
        // Dritten Bereich des jeweiligen Arrays prüfen
        let c = gameState[winCondition[2]];
        // Wenn a, b & c leer sind (kein Gewinn); Weitermachen
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // Wenn a b und b c entspricht (Gewinn vorhanden)
        if (a === b && b === c) {
            // Gewinn vorhanden
            roundWon = true;
            // Zum Gewinn geführten Zellen farblich darstellen
            changeColor();
            // Spiel beenden
            break;
        }
    }

    // Wenn roundWon true ist
    if (roundWon) {
        // Gewinner anzeigen
        statusDisplay.innerHTML = winningMessage();
        // Spiel beenden
        gameActive = false;
        return;
    }

    // gameState enthält keine leeren Felder (Unentschieden)
    let roundDraw = !gameState.includes("");
    // Wenn roundDraw true
    if (roundDraw) {
        // Status "Unentschieden" anzeigen
        statusDisplay.innerHTML = drawMessage();
        // Spiel beenden
        gameActive = false;
        return;
    }

    // Ansonsten Spieler tauschen und Schleife erneut durchgehen
    handlePlayerChange();
}

// Klick auf Zelle
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Index der zuletzt angeklickten Zelle
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Wenn der Inhalt der Zelle keine Leerzeichen enthält und das Spiel nicht aktiv ist
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        // Beenden
        return;
    }

    // Funktionen aufrufen
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Spiel neustarten
function handleRestartGame() {
    // Spiel starten
    gameActive = true;
    // Spielstand zurücksetzen
    gameState = ["", "", "", "", "", "", "", "", ""];
    // Aktuellen Spieler anzeigen
    statusDisplay.innerHTML = currentPlayerTurn();
    // Zellen leeren
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Zellen anklickbar
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// Ausgabe der JSON
function getMatches() {
    const Http = new XMLHttpRequest();
    const urlGetMatches='http://localhost:5000/api/Matches/';
    Http.open("GET", urlGetMatches);
    Http.send();

    Http.onloadend = (e) => {
    var httpText = Http.responseText
    console.log(httpText)    
    var normalText = JSON.parse(httpText);    
    console.log(normalText.length)
    // Array-Darstellung für Spieler X
    // Fields 
    document.getElementById("jsonAreaXFields").value = normalText[0].fields;  
    // isFinished
    document.getElementById("jsonAreaXisFinished").value = normalText[0].isFinished;
    // isWon
    document.getElementById("jsonAreaXisWon").value = normalText[0].isWon;
    // Winner
    document.getElementById("jsonAreaXWinner").value = normalText[0].Winner;
    // readyToStart
    document.getElementById("jsonAreaXReadyToStart").value = normalText[0].ReadyToStart;
    // Spiele ID X
    document.getElementById("jsonAreaXID").value = normalText[0].id;
    // Player X ID
    document.getElementById("jsonAreaPlayerXID").value = normalText[0].playerX.id;
    // Player X State
    document.getElementById("jsonAreaXState").value = normalText[0].playerX.state;
 
    // Array-Darstellung für Spieler O
    // Fields
    document.getElementById("jsonAreaOFields").value = normalText[1].fields;
    // isFinished
    document.getElementById("jsonAreaOisFinished").value = normalText[1].isFinished;
    // isWon
    document.getElementById("jsonAreaOisWon").value = normalText[1].isWon;
    // Winner
    document.getElementById("jsonAreaOWinner").value = normalText[1].Winner;
    // readyToStart
    document.getElementById("jsonAreaOReadyToStart").value = normalText[1].ReadyToStart;
    // Spiele ID O
    document.getElementById("jsonAreaOID").value = normalText[1].id;
    // Player O ID
    document.getElementById("jsonAreaPlayerOID").value = normalText[0].playerX.id;
    }
}
