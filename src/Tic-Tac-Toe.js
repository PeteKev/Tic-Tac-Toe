// Konstante zum aktuellen Spielstatus
const statusDisplay = document.querySelector('.game--status');

// Variable wenn das Spiel vorbei ist, zu false initialisieren 
let gameActive = true;

var match;

// Variablen zur JSON
var gameField; 
var xIsFinished; 
var xIsWon; 
var xWinner;
var xReadyToStart;
var xID;
var PlayerXID;
var xState;
var oFields; 
var oIsFinished; 
var oIsWon; 
var oWinner; 
var oReadyToStart; 
var oID;

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

// Zellen anklickbar
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

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

// Fenster neu laden + json tbd
function reloadWindow() {
    window.location.reload(true);
    // JSON zum Ursprungszustand zurücksetzen
    deletePlayer();
}

// Tabelle erstellen, Parameter matchObject & Zähler i
function tableCreate(matchObject, i) {
        match = {
            // Spielnummer ausgeben
            name: "Spiel" + i,
            id: matchObject.id,
        };
        // Tabelle anhand der ID
        var table = document.getElementById("matchesTable");
        //console.log("Matches" + matchObject)
        // Reihen anhand der Anzahl von i einfügen
        var row = table.insertRow(i);
        row.id="Test" + i;
        //row.onclick=getId(row);
        // Zelle 1 erstellen
        var cell1 = row.insertCell(0);
        // Zelle 2 erstellen
        var cell2 = row.insertCell(1);

        // In Zelle 1 Spielname ausgeben
        cell1.innerHTML = match.name,
        // In Zelle 2 Spiel-ID ausgeben
        cell2.innerHTML = match.id;
        // Match ID Variable
        //console.log(match.id);
}

// Matches erkennen
function getMatches() {  
    // ID der Tabelle   
    var matchesTable = document.getElementById("matchesTable");
    // Anzahl der Reihen der Tabelle
    var numbersOfRows = document.getElementById("matchesTable").rows.length;
    // Solange die Anzahl der Reihen -1 größer als gleich 0 ist, Zellen löschen
    for (let i = numbersOfRows-1; i >= 0; i--) {
        //console.log(i)
        // Tabelle bei Klick auf Button löschen / durch aktualisierte ersetzen
        matchesTable.deleteRow(i)
    }

    // HTTP Schnittstelle
    const Http = new XMLHttpRequest();
    // Spiel-URL
    const url = 'http://localhost:5000/api/matches';

    // URL öffnen
    Http.open("GET", url);
    Http.send();

    Http.onloadend = (e) => {
        // Antwort als JSON
        matches = JSON.parse(Http.responseText);

        for (let i = 0; i < matches.length; i++) {
            // Anzahl der Matches in Konsole ausgeben
            //console.log("length " + matches.length);
            // Tabelle anhand der Anzahl i erstellen
            tableCreate(matches[i], i );
        }
    }
}

// create Game (Spiel beitreten)
function createGame() {
    // HTTP Schnittstelle
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:5000/api/matches/';

    Http.open("POST", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        // Antwort in Console ausgeben
        console.log(Http.responseText)
    }
}

// Match joinen
function joinMatch() {
    // HTTP Schnittstelle
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:5000/api/matches/' + matches[0].id + '/player';

    Http.open("POST", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        // Antwort in Console ausgeben
        //console.log(Http.responseText)
    }
    // ID der Matches
    intoMatch(matches[0].id);
}

// JSON des Matches zum Spielbeitritt ausgeben
function intoMatch() {
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:5000/api/matches/' + matches[0].id;

    Http.open("GET", url);
    Http.send();

    Http.onloadend = (e) => {
        // Antwort JSON verarbeiten
        var responseText = Http.responseText;
        var jsonData = JSON.parse(responseText); 
        // Gesamte JSON ausgeben
        //console.log(jsonData);  

        // Spielfelder
        console.log(jsonData.fields[0]);
        console.log(jsonData.fields[1]);
        console.log(jsonData.fields[2]);
        // Game ID
        console.log("Game ID: " + jsonData.id);
        // Is Finished
        console.log("Is Finished: " + jsonData.isFinished);
        // Is Won
        console.log("Is Won: " + jsonData.isWon);
        // PlayerO ID
        console.log("PlayerO ID: " + jsonData.playerO.id);
        // Player O State
        console.log("PlayerO State: " + jsonData.playerO.state);
        // PlayerX ID
        console.log("PlayerX ID: " + jsonData.playerX.id);
        // Player X State
        console.log("PlayerX State: " + jsonData.playerX.state);
        // ReadyToStart
        console.log("ReadyToStart: " + jsonData.readyToStart);
        // Winner
        console.log("Winner:" + jsonData.winner);        
    }
}

// Zelle geklickt, Parameter der geklickten Zelle und Index
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Spielstatus entspricht den aktuellen Spieler
    gameState[clickedCellIndex] = currentPlayer;
    // Zeichen je nach Spieler setzen
    clickedCell.innerHTML = currentPlayer;
    // Index der geklickten Zelle
    console.log("Cell " + clickedCellIndex)
}

// Spieler tauschen
function handlePlayerChange() {
    // Wenn currentPlayer ist X, wechsel zu O, sonst bleib bei X
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
    // // Statusanzeige welcher Spieler dran ist
    statusDisplay.innerHTML = currentPlayerTurn(); 
}

// Funktion Gewinnkombination farblich darstellen
function changeColor(winningRow) {
    for (let i = 0; i<3; i++){
        document.getElementById(winningRow[i]).style.backgroundColor = 'red';
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
            changeColor(winningConditions[i]);
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

// Ausgabe der JSON
function getJSON() {
    const json = new XMLHttpRequest();
    const urlGetJSON='http://localhost:5000/api/Matches/';
    json.open("GET", urlGetJSON);
    json.send();

    json.onloadend = (e) => {
    var jsonText = json.responseText;
    console.log(jsonText);       
    }
}