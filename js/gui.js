
function sout(text) {
    console.log(text);
}

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight / 1.5);
    myCanvas.parent('gameBoard');
    background(202, 173, 137, 0.692);
    frameRate(5);
    choiceMade = false;
}

function draw() {
    if (!tourFinished && playerColor != null) {
        track.show(riders);
        update();
    }
}

function getSettings() {
    var radios = document.getElementsByName('player-color');
    var slider = document.getElementById('input-track-num');

    numberOfTracks = slider.value;
    addTracksToChosen();
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            playerColor = radios[i].value;
            colors.splice(colors.indexOf(radios[i].value), 1);
        }
    }

    var settings = document.getElementById("settings");
    settings.hidden = true;

    var game = document.getElementById("game");
    game.hidden = false;

    var standingBoard = document.getElementById("standing-board");
    standingBoard.hidden = false;

    newTour();
}

function endTour() {
    var game = document.getElementById("game");
    game.hidden = true;
    tourModal.style.display = "block";
    tourModal.hidden = false;
}

function addToReport(text) {
    var el = document.getElementById("report");
    el.innerHTML = text;
}

function addToElement(elem, text) {
    var el = document.getElementById(elem);
    el.innerHTML = text;
}

function appendToElement(elem, text) {
    var el = document.getElementById(elem);
    el.innerHTML += text;
}

function showTurn() {
    var el = document.getElementById("roundCounter");
    el.innerHTML = "Turn " + turn;
}


function update() {
    riders.forEach(r => {
        if (track.matrix[r.pos[0]][0] != "x" && r.pos[1] == 1) {
            r.moveDown(r.pos, track);
        }
    });
}

function showRiderInfo() {
    for (var rider of human) {
        if (rider.role == "r") {
            addToElement("rInfo", "Rouleur " + "(" + rider.deck.deck.length + ")");
        }
        if (rider.role == "s") {
            addToElement("sInfo", "Sprinteur " + "(" + rider.deck.deck.length + ")");
        }
    }
}

/**
 * CARDS
 */


function addToHand() {
    for (var r of human) {
        for (var i = 0; i < 4; i++) {
            showHand(r.role, r.hand[i], i);
        }
    }
}

function showHand(type, hand, i) {
    var btn = document.getElementById(type + i);
    btn.setAttribute("style", "background-color: none;");
    if (hand == "f") {
        btn.setAttribute("style", "background-color: red;");
        btn.innerHTML = 2;
    } else if (hand != null) {
        btn.innerHTML = hand;
    } else {
        btn.innerHTML = "";
    }
    btn.style.fontSize = "xx-large";
}

function hideCards(type) {
    for (var i = 0; i < 4; i++) {
        if (type == "sprinteur") {
            showHand("s", [], i);
        }
        if (type == "rouleur") {
            showHand("r", [], i);
        }
    }
}


/**
 * STANDINGS
 */

function addToStanding() {
    for (var i = 1; i < 9; i++) {
        standing[i] = [i, "", 0];
    }
}

function clearStanding() {
    for (var i = 1; i < 9; i++) {
        //addToElement("standing" + i, "");
        addToElement("points" + i, "");
        addToElement("medals" + i, "");
    }
}

function addStandingToHTML(s) {
    clearStanding();
    for (var i = 1; i < 9; i++) {
        if (riders.length != 0) {
            addToElement("standing" + i, getRiderById(i).name);
            appendToElement("points" + i, s[i][1]);
            appendToElement("medals" + i, s[i][2]);
        } else {
            appendToElement("points" + i, s[i][1]);
            appendToElement("medals" + i, s[i][2]);
        }
    }
}

function updateStandings() {
    for (var rider of ridersFinished) {
        if (ridersFinished.indexOf(rider) == 0) {
            standing[rider.id][2] += 3;
            standing[rider.id][1] += '🥇';
        } else if (ridersFinished.indexOf(rider) == 1) {
            standing[rider.id][2] += 2;
            standing[rider.id][1] += '🥈';
        } else if (ridersFinished.indexOf(rider) == 2) {
            standing[rider.id][2] += 1;
            standing[rider.id][1] += '🥉';
        }
    }
}