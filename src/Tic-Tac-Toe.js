var currentPlayerName = 'X'; /*Aktuelle Spieler*/
$('span[name="whoseturn"]').text(currentPlayerName); /*Nächster Zug*/
$('.player[name="X"]').addClass('highlight'); /*Aktuellen Spieler hervorheben*/
$('.player[name="O"]').addClass('unhighlight'); 

$('td').click( /*Klick auf Tabelle*/
	function() {
		if(currentPlayerName == 'X') { /*Wenn Spieler X am Zug*/
			$(this).text('X');
			$('span[name="whoseturn"]').text('O'); /*Nächsten Spieler anzeigen*/

			$('.player[name="X"]').removeClass('highlight'); /*Button X highlighten*/
			$('.player[name="X"]').addClass('unhighlight');

			$('.player[name="O"]').removeClass('unhighlight'); /*Button O highlighten*/
			$('.player[name="O"]').addClass('highlight');

			currentPlayerName = 'O'; /*Spieler O am Zug*/
				
		} else { /*Gegensätzlich zu oben*/

			$(this).text('O');
			$('span[name="whoseturn"]').text('X');

			$('.player[name="O"]').removeClass('highlight');
			$('.player[name="O"]').addClass('unhighlight');

			$('.player[name="X"]').removeClass('unhighlight');
			$('.player[name="X"]').addClass('highlight');

			currentPlayerName = 'X';		
		}
	}
);