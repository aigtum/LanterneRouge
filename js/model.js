// track stuff
var trackLength = 7 * 6 + 12 * 2 + 6*2;
var track;
var finishLineAt = 73;
var startLineAt = 4;
// rider stuff
var human = [];
var riders = [];
var ridersFinished = [];
var draft = [];
// points
var standing = {};

// game stuff
var roundPositions = [];
var tourFinished;
var gameFinished;
var roundFinished;
var turn;



function getRiderById(id) {
    for (rider of riders) {
        if (rider.id == id) {
            return rider;
        }
    }
}

var humanChoices = 0;

// get choice from html button
function getPlayerChoice(riderID, move) {
    // put new choice into choices
    var riderObj = getRiderById(riderID);
    riderObj.setChoice(move);
    hideCards(riderObj.cards);
    humanChoices++;

    //check if both choices are down -> execute round
    if (humanChoices == human.length) {
        var riderOrder = getRiderOrder();
        for (rider of riderOrder) {
            if (rider.control == "player") {
                rider.move(rider.choice, riders, track);
            }
        }
        humanChoices = 0;
        endRound();
    }
    
}


/*
 * GAME
 */

function newTour() {
    tourFinished = false;
    addToStanding();
    newGame();
}

function newGame() {
    if (chosenTracks.length == 0) {
        alert("Tour has finished! Winner: " + standing);
        tourFinished = true;
    } else {
        addToElement("finalResult", "");
        track = new Track(5, 5, trackLength, chosenTracks.pop());
        
        // red team
        riders.push(new Rider(1, 1, "Player R", track.x, track.y, "r", [61, 0], "rouleur", "player", "red"));
        riders.push(new Rider(2, 1, "Player S", track.x, track.y, "s", [62, 1], "sprinteur", "player", "red"));
        
        // blue team
        riders.push(new Rider(3, 2, "Peloton R", track.x, track.y, "r", [54, 0], "peloton", "peloton", "pink"));
        riders.push(new Rider(4, 2, "Peloton S", track.x, track.y, "s", [53, 0], "peloton", "peloton", "pink"));
        
        // green team
        riders.push(new Rider(5, 3, "Muscle1 R", track.x, track.y, "r", [53, 1], "muscleRouleur", "muscle1", "lightblue"));
        riders.push(new Rider(6, 3, "Muscle1 S", track.x, track.y, "s", [54, 1], "muscleSprinteur", "muscle1", "lightblue"));
        
        // pink team
        riders.push(new Rider(7, 4, "Muscle2 R", track.x, track.y, "r", [51, 0], "muscleRouleur", "muscle2", "lightgreen"));
        riders.push(new Rider(8, 4, "Muscle2 S", track.x, track.y, "s", [52, 0], "muscleSprinteur", "muscle2", "lightgreen"));
        
        turn = 0;
        getPlayerRiders();
        newRound();
    }
}

function addToStanding() {
    for (var i = 1; i < 9; i++) {
        standing[i] = 0;
    }
}


function updateStandings() {
    for (rider of ridersFinished) {
        if (ridersFinished.indexOf(rider) == 0) {
            standing[rider.id] += 3;
        } else if (ridersFinished.indexOf(rider) == 1) {
            standing[rider.id] += 2;
        } else if (ridersFinished.indexOf(rider) == 2) {
            standing[rider.id] += 1;
        }
    }
    sout(standing);
}


function newRound() {
	roundPositions = [];
	draft = [];
	
    showRiderInfo();
	for (rider of riders) {
        if (rider.control == "player") {
            rider.getNewHand();
        } else {
            rider.getNewCard();
        }
	}
	addToHand();
	turn++;
    showTurn();
    if (human.length == 0 && turn > 1) {
        endRound();
    }
}


function endRound() {
    //sout(track.matrix);
	if (riders.length == 0) {
        alert("Game finished: " + ridersFinished[0].name + " has won!");
        updateStandings();
        gameFinished = true;
        newGame();
	} else {
        sout("_________________\nRound ended\n_________________");
    
        riders = getRiderOrder();
        moveAIRecursive(0).then(() => {
            sleep(1000).then(() => {
                checkFinished();
                updateDraft(0).then(() =>  {
                    checkFatigue();
                    newRound();
                });
            })
        });

    }
}

