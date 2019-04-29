/* jslint esversion: 6 */



/**
 * Setup:
 * 1) Set up board
 * 2) put riders in their places
 * 3) shuffle decks 
 * 
 * 
 * New round:
 * 1) draw 4 cards from deck (depending on type) -> put in hand -> show to user
 * 2) choose one card from each hand
 * 3) move riders (first user's then ai)
 * 4) updated draft (move riders accordingly)
 * 5) add fatigue cards when necessary
 */



const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}


function putHandInDeck(hand, type) {
	for (var i = 0; i < hand.length; i++) {
		type.push(hand[i]);
	}
}