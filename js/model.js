// track stuff
var track;
var trackLength = 78;
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

var playerColor;
var numberOfTracks;

var turn;

var colors = ["Red", "Blue", "Green", "Black"];

function getRiderById(id) {
    for (var rider of riders) {
        if (rider.id == id) {
            return rider;
        }
    }
}

var humanChoices = 0;

// get choice from html button
function getPlayerChoice(riderID, move) {
    //var sModal = document.getElementById('mySprinteurModal');
    //var rModal = document.getElementById('myRouleurModal');

    // put new choice into choices
    var riderObj = getRiderById(riderID);
    riderObj.setChoice(move);
    hideCards(riderObj.cards);
    if (riderObj.role == "r") {
        rModal.style.display = "none";
        rBtn.disabled = true;
    } else if (riderObj.role == "s") {
        sModal.style.display = "none";
        sBtn.disabled = true;
    }
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
    if (playerColor != null) {
        tourFinished = false;
        addToStanding();
        newGame();
    }

}

function newGame() {
    if (chosenTracks.length == 0) {
        addStandingToHTML(standing);
        tourFinished = true;
        endTour();
    } else {
        riders = [];
        ridersFinished = [];
        addToElement("finalResult", "No riders finished yet.");
        track = new Track(5, 5, chosenTracks.pop());
        addToElement("track-name", track.name);
        trackLength = track.length;
        startLineAt = track.startLineAt;
        finishLineAt = track.finishLineAt;

        // player team
        riders.push(new Rider(1, 1, "Player R", track.x, track.y, "r", [startLineAt - 3, 1], "rouleur", "player", playerColor));
        riders.push(new Rider(2, 1, "Player S", track.x, track.y, "s", [startLineAt - 4, 1], "sprinteur", "player", playerColor));
        //riders.push(new Rider(1, 1, "Player R", track.x, track.y, "r", [finishLineAt - 2, 1], "rouleur", "player", playerColor));
        //riders.push(new Rider(2, 1, "Player S", track.x, track.y, "s", [finishLineAt - 4, 1], "sprinteur", "player", playerColor));

        // peloton
        riders.push(new Rider(3, 2, "Peloton R", track.x, track.y, "r", [startLineAt - 1, 0], "peloton", "peloton", colors[0]));
        riders.push(new Rider(4, 2, "Peloton S", track.x, track.y, "s", [startLineAt - 2, 0], "peloton", "peloton", colors[0]));

        // muscle team 1
        riders.push(new Rider(5, 3, "Muscle1 R", track.x, track.y, "r", [startLineAt - 1, 1], "muscleRouleur", "muscle1", colors[1]));
        riders.push(new Rider(6, 3, "Muscle1 S", track.x, track.y, "s", [startLineAt - 2, 1], "muscleSprinteur", "muscle1", colors[1]));

        // muscle team 2
        riders.push(new Rider(7, 4, "Muscle2 R", track.x, track.y, "r", [startLineAt - 4, 0], "muscleRouleur", "muscle2", colors[2]));
        riders.push(new Rider(8, 4, "Muscle2 S", track.x, track.y, "s", [startLineAt - 3, 0], "muscleSprinteur", "muscle2", colors[2]));

        turn = 0;
        getPlayerRiders();
        clearStanding();
        addStandingToHTML(standing);
        newRound();
    }
}


function newRound() {
    roundPositions = [];
    draft = [];
    for (rider of human) {
        if (rider.role == "r") {
            rBtn.disabled = false;
        } else if (rider.role == "s") {
            sBtn.disabled = false;
        }
    }

    showRiderInfo();
    for (var rider of riders) {
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
                updateDraft(0).then(() => {
                    checkFatigue();
                    newRound();
                });
            })
        });

    }
}

function addTracksToChosen() {
    for (var i = 0; i < numberOfTracks; i++) {
        var rand = avaliableTracks[Math.floor(Math.random() * avaliableTracks.length)];
        avaliableTracks.splice(avaliableTracks.indexOf(rand), 1);
        chosenTracks.push(rand);
    }
}

function getPlayerRiders() {
    for (rider of riders) {
        if (rider.control == "player") {
            human.push(rider)
        }
    }
}