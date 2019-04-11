// track stuff
var trackLength = 7 * 6 + 12 * 2 + 6*2;
var track;
var finishLineAt = 73;
var startLineAt = 4;
// rider stuff
var colors = ["red", "blue", "black", "green"];   // not used
var riders = [];
var ridersFinished = [];
var draft = [];

// points
var standing = {};

// game stuff
var roundPositions = [];
var gameFinished;
var roundFinished;
var userDoneS = false, userDoneR = false;
var sDone = false, rDone = false;
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
    choices[riderID-1] = move
    // put new choice into choices
    var riderObj = getRiderById(riderID);
    riderObj.setChoice(move);
    // TODO hide cards from GUI
    humanChoices++;

    //check if both choices are down -> execute round
    if (humanChoices == 2) {
        var riderOrder = getRiderOrder();
        for (rider of riderOrder) {
            if (rider.control == "player") {
                move(rider.choice, riders, track);
            }
        }

        humanChoices = 0;
        endRound();
    }
    
}


/*
 * GAME
 */

function newGame() {
	//track = new Track(5, 5, trackLength, classic);
	track = new Track(5, 5, trackLength, firenze_milano);
	endTurnBtn = document.getElementById("endTurnBtn");

	// red team
	riders.push(new Rider(1,2, "Red R", track.x, track.y, "r", [19, 0], "rouleur", "player"));
	riders.push(new Rider(2,1, "Red S", track.x, track.y, "s", [19, 1], "sprinteur", "player"));

	// blue team
	riders.push(new Rider(3,4, "Blue R", track.x, track.y, "r", [4, 0], "peloton", "peloton"));
	riders.push(new Rider(4,3, "Blue S", track.x, track.y, "s", [3, 0], "peloton", "peloton"));

	// green team
	riders.push(new Rider(5,6, "Green R", track.x, track.y, "r", [3, 1], "muscleRouleur", "muscle1"));
	riders.push(new Rider(6,5, "Green S", track.x, track.y, "s", [4, 1], "muscleSprinteur", "muscle1"));

	// pink team
	riders.push(new Rider(7,8, "Pink R", track.x, track.y, "r", [1, 0], "rouleur", "muscle2"));
	riders.push(new Rider(8,7, "Pink S", track.x, track.y, "s", [2, 0], "sprinteur", "muscle2"));

    turn = 0;
    setColor(riders);

	newRound();
}

function endRound() {
    //sout(track.matrix);
    sout("_________________\nRound ended\n_________________");
    peloCard = drawOneCard(peloton);

    riders = getRiderOrder();
    moveAIRecursive(0).then(() => {
        checkFinished();
        sleep(1000).then(() => {
            updateDraft(0).then(() =>  {
                checkFatigue();
                putHandInDeck(sHand, sprinteur);
                putHandInDeck(rHand, rouleur);
                newRound();
            });
        })
    });
}

