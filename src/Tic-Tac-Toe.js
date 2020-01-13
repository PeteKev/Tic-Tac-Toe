//Variable wenn das Spiel vorbei ist, zu false initialisieren 
var gameOver = false;

// Abfrage, welcher Spieler beginnnen soll (if)
if(confirm("Soll X starten?") == true) {
	var player = 'X';
} else {
	var player = 'O';
}

// Array für jedes Zelle der Tabelle
var squares = new Array();
squares[0] = 0;
squares[1] = 1;
squares[2] = 2;
squares[3] = 3;
squares[4] = 4;
squares[5] = 5;
squares[6] = 6;
squares[7] = 7;
squares[8] = 8;

// Gewinnkombinationen
var winCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Funktion reset ohne Parameter
function reset() {

	// Schleife die mit Index 1 anstatt 0 startet
	// Dadurch werden alle 9 Squares angesprochen
	for (var i = 1; i < squares.length + 1; i++) {
		
		// HTML-Element mit der gleichen ID wie oben updaten
		var htmlbutton = "sqr" +i;
	}
	// Variable zum leeren Array zurücksetzen
	squares = [];

	// Variable zurücksetzen und auf true oder false setzen
	gameOver = false;
}

// Funktion squareClick, Parameter square
function squareClick(square) {
	
	// Variable, welche die ID des Square enthält
	var idElement = document.getElementById(square).value;
	
	// Variable, ParseInt als Argument übergeben und 1 vom Ergebnis des Aufrufs subtrahieren
	// Gibt den Index des Arrays von Square aus, auf den der User klickt
	var parseSquare = ((parseInt(square.substring(3, 4))) -1);

	// Wenn die Variable idElement leer ist 
	if(idElement == "") {
		// Mithilfe der ID des Parameters square das HTML-Element updaten
		// Inhalt der Variable player angleichen
		document.getElementById(square).value = player;

		// Inhalt 
		squares[parseSquare] = player;
	}

	// Funktion checkForWinner X aufrufen, X als Argument übergeben
	checkForWinner('X');

	// Funktion checkForWinner O aufrufen, O als Argument übergeben
	checkForWinner('O');

	// Spieler tauschen
	if(player == 'O') {
		player = 'X';
	} else {
		player = 'O';
	}
}

// Funktion playAgain
function playAgain() {

	// Variable die die Antwort der Dialogbox speichert
	var response = confirm("Nochmal spielen?");

	// Geb je nach Inhalt der Variable response Text aus
	if (response == true) {
		alert("Wir spielen nochmal!")
		reset ();
	} else {
		alert("Danke fürs Spielen!")
	}
}

// Funktion checkForWinner
function checkForWinner(value) {
	// Bei Index 0 starten, so lange wie der Index kleiner als die Länge des Arrays winCombinations
	for(var i = 0; i < winCombinations.length; i++) {
		// If-Statement, welches bewertet, ob der Index des Arrays winCombinations den Array squares entspricht
		// Der erste Index ist die Loop-Variable, der zweite Index entspricht 0,1 oder 2
		// Prüfen, ob diese den Value Parameter entsprechen
		if(squares[winCombinations[i][0]] == value && squares[winCombinations[i][1]] == value && squares[winCombinations[i][2]] == value) {
			// Gewinner anzeigen
			alert(value + " hat gewonnen!");
			// Variable gameOver auf true setzen
			gameOver == true;
		}
	}	
		// Prüfen, ob gameOver true ist
		if(gameOver == true) {
			// Funktion playAgain aufrufen
			playAgain();
		} else {
			return("Der nächste Spieler ist dran!");
		}
		// Zellen highlighten 
		Highlight
	}

// Funktion Highlight
function Highlight() {

} 	