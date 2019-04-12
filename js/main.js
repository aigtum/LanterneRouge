/* jslint esversion: 6 */

/**
 * BUGS:
 * 
 * - draft downhill sometimes pushes too far
 * - cant move the other after one of the riders is finished
 * - riders change color 
 */



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
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}


/*
 * MOVEMENT
 */

function moveAIRecursive(index) {
	if (index == riders.length) {
		return Promise.resolve();
	} else if (riders[index].control == "player") {
		return moveAIRecursive(index + 1);
	} else {
		//sout("-> " + riders[index].name);
		return new Promise((resolve, reject) => {
			setTimeout(function () {
				moveSingleAI(riders[index]);
				moveAIRecursive(index + 1).then(() => {
					resolve();
				});
			}, 1000)
		})
	}
}

function moveSingleAI(r) {
	sout("Rider choice: " + r.choice);
	if(r.choice == 92){
		sout("Peloton: ATTACK!");
		if (r.role == "r"){
			r.move(2, riders, track);
			//getRiderById(r.teamID).move(9, riders, track);
		}
		else if (r.role == "s"){
			r.move(9, riders, track);
			//getRiderById(r.teamID).move(2, riders, track);
		} 
	}else{
		r.move(r.choice, riders, track);
	}
}

function updateDraft(index) {
	sout("-> updating draft");
	if (index == riders.length) {
		return Promise.resolve();
	} else {
		return new Promise((resolve, reject) => {
			checkDraft().then(() => {
				moveDraft();
				updateDraft(index + 1).then(() => {
					resolve();
				});
			})
		})
	}

}

function checkDraft() {
	draft = [];
	riders.forEach(r => {
		if ((track.matrix[r.pos[0] + 2][0] == "x")
		&& track.matrix[r.pos[0] + 1][0] != "x"
		&& r.pos[0] < finishLineAt 
		&& track.getTile(r.pos[0] + 2, 0).type != "u"
		&& track.getTile(r.pos[0],0).type != "u") {
			draft.push(r);
		}
	});
	return Promise.resolve();
}

function moveDraft() {
	draft.forEach(r => {
		r.move(1, riders, track);
	});
	return true;
}

function checkFatigue() {
	sout("-> checkig fatigue");
	var report = "";
	//var racers = getRiderOrder();
	human.forEach(r => {	
		if (track.matrix[r.pos[0] + 1][0] != "x" && r.pos[0] < finishLineAt) {
			if (r.role == "s") {
				report += "Sprinteur received a fatigue card! "
			}
			if (r.role == "r") {
				report += "Rouleur received a fatigue card! "
			}
			r.addCards('f');
		}
	});
	addToReport(report);
}


/**
 * 
 * CARDS
 */



function putHandInDeck(hand, type) {
	for (var i = 0; i < hand.length; i++) {
		type.push(hand[i]);
	}
}


function getRiderOrder() {
	var order = [];
	for (var i = track.length - 1; i > 0; i--) {
		for (var j = 0; j < 2; j++) {
			riders.forEach(rider => {
				if (rider.pos[0] == i && rider.pos[1] == j) {
					order.push(rider);
				}
			});
		}
	}
	return order;
}

function checkFinished() {
	var f = document.getElementById("finalResult");

	for (var i = track.length - 1; i > track.length - 6; i--) {
		for (var j = 0; j < 2; j++) {
			riders.forEach(rider => {
				if (rider.pos[0] == i && rider.pos[1] == j) {
					ridersFinished.push(rider);
					f.innerHTML += "| " + ridersFinished.length + ": " + rider.name + " (" + turn + ")" + " |";
					removeFinished(rider);
				}
			});
		}
	}
}

function removeFinished(rider) {
	if (rider.control == "player") {
		riders.splice(riders.indexOf(rider), 1);	
		human.splice(human.indexOf(rider), 1);	
	} else {
		riders.splice(riders.indexOf(rider), 1);
	}
	track.matrix[rider.pos[0]] = ["_", "_"];
}