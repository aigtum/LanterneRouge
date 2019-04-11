
var human = new Array(2);

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight/2);
    myCanvas.parent('gameBoard');
    background(0, 230, 50);
    frameRate(5);
    newGame();
    gameFinished = false;
    roundFinished = false;
    choiceMade = false;
    getPlayerRiders();
    newGame();
}

function getPlayerRiders(){
    for(rider of riders){
        if (rider.control == "player"){
            human.push(rider)
        }
    }
}


function draw() {
    sout("test");
    track.show(riders);
    update();

    for (r of human){
        for (var i = 0; i < 4; i++) {
            showHand(r.role, r.hand[i], i);
        }
    }
}


function setColor(riders) {
    colors = ["red", "pink", "lightblue", "lightgreen"];
    for (rider of riders) {
        rider.color = colors[rider.teamId-1];
    }
}



function showHand(type, hand, i) {
    var btn = document.getElementById(type + i);
    sout("<<<< " + type + ", " + i);
	btn.setAttribute("style", "background-color: none;");
	if (hand[i] == "f") {
		btn.setAttribute("style", "background-color: red;");
		btn.innerHTML = 2;
	} else if (hand[i] != null) {
		btn.innerHTML = hand[i];
	} else {
		btn.innerHTML = "";
	}
	btn.style.fontSize = "xx-large";

}