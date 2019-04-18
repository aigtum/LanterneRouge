
function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight/2);
    myCanvas.parent('gameBoard');
    background("green");
    frameRate(5);
    newTour();
    choiceMade = false;
}

function draw() {
    if (!tourFinished) {
        track.show(riders);
        update();
    }
}

function getPlayerRiders(){
    for(rider of riders){
        if (rider.control == "player"){
            human.push(rider)
        }
    }
}

function addToReport(text) {
	var el = document.getElementById("report");
	el.innerHTML = text;
}

function addToElement(elem, text) {
	var el = document.getElementById(elem);
	el.innerHTML = text;
}

function showTurn() {
	var el = document.getElementById("roundCounter");
	el.innerHTML = "Turn " + turn;
}

function sout(text) {
	console.log(text);
}

function update() {
	riders.forEach(r => {
		if (track.matrix[r.pos[0]][0] != "x" && r.pos[1] == 1) {
			r.moveDown(r.pos, track);
		}
	});
}

function showRiderInfo() {
    for (rider of human) {
        if (rider.role == "r") {
            addToElement("rInfo", "Rouleur " + "(" + rider.deck.deck.length + ")");
        }
        if (rider.role == "s") {
            addToElement("sInfo", "Sprinteur " + "(" + rider.deck.deck.length + ")");
        }
    }
}

function addToHand() {
    for (r of human){
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