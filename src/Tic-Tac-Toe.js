//Variable wenn das Spiel vorbei ist, zu false initialisieren 
var gameOver = false;

// Abfrage, welcher Spieler beginnnen soll (if)
if(confirm("Soll X starten?") == true) {
	var player = 'X';
} else {
	var playere = 'O';
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

// Funktion squareClick, Parameter square
function squareClick(Square) {
	
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

		//
		squares[parseSquare] = player;
	}

	// Funktion checkForWinner X


	// Funktion CheckForWinner O


	// Spieler tauschen
}