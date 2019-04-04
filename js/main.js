
// track stuff
var trackLength = 7 * 6 + 12 * 2 + 6*2;
var track;
var finishLineAt = 73;
var startLineAt = 4;
// rider stuff
var colors = ["red", "blue", "black", "green"];
var rr, rs, br, bs, gr, gs, pr, ps;
var riders = [];
var ridersFinished = [];
var draft = [];
// card stuff
var sprinteur =        [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9];
var rouleur =          [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
var peloton =          [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 92];
var muscleSprinteur1 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
var muscleRouleur1 =   [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
var muscleSprinteur2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
var muscleRouleur2 =   [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
var sHand = [], rHand = [];
var peloCard;
// game stuff
var roundPositions = [];
var gameFinished;
var roundFinished;
var userDoneS = false, userDoneR = false;
var sDone = false, rDone = false;
var turn;

/**
 * Helper functions
 */

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
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

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function setup() {
  createCanvas(windowWidth, 400);
  background(0, 230, 50);
  frameRate(5);
  newGame();
  gameFinished = false;
  roundFinished = false;
  choiceMade = false;
}

function draw() {
  track.show(riders);
  update();
}

function update() {
  riders.forEach(r => {
    if (track.matrix[r.pos[0]][0] != "x" && r.pos[1] == 1) {
      r.moveDown(r.pos, track);
    }
  });
}

function keyReleased() {
  if (keyCode === ENTER) {
    sout("----------------"); 
    endRound();
  }

}

function keyPressed() {
}


/*
 * GAME
 */

function newGame() {
  // cards
  sprinteur = shuffle(sprinteur);
  rouleur = shuffle(rouleur);
  peloton = shuffle(peloton);
  muscleSprinteur1 = shuffle(muscleSprinteur1);
  muscleRouleur1 = shuffle(muscleRouleur1);
  muscleSprinteur2 = shuffle(muscleSprinteur2);
  muscleRouleur2 = shuffle(muscleRouleur2);

  track = new Track(5, 5, trackLength);

  // red team
  rr = new Rider("Red R",track.x,track.y,"red","r",[2, 1],rouleur,"player");
  rs = new Rider("Red S",track.x,track.y,"red","s",[1, 1],sprinteur,"player");

  // blue team
  br = new Rider("Blue R",track.x,track.y,"lightblue","r",[4, 0],rouleur,"peloton");
  bs = new Rider("Blue S",track.x,track.y,"lightblue","s",[3, 0],sprinteur,"peloton");

  // green team
  gr = new Rider("Green R",track.x,track.y,"lightgreen","r",[3, 1],rouleur,"muscle1");
  gs = new Rider("Green S",track.x,track.y,"lightgreen","s",[4, 1],sprinteur,"muscle1");

  // pink team
  pr = new Rider("Pink R",track.x,track.y,"pink","r",[1, 0],rouleur,"muscle2");
  ps = new Rider("Pink S",track.x,track.y,"pink","s",[2, 0],sprinteur,"muscle2");

  riders.push(rs);
  riders.push(rr);
  riders.push(bs);
  riders.push(br);
  riders.push(gs);
  riders.push(gr);
  riders.push(ps);
  riders.push(pr);

  turn = 0;
  newRound();
}

function newRound() {
  //sout(">>" + sprinteur + "/" + sprinteur.length);
  //sout(">>" + rouleur + "/" + rouleur.length);
  sHand = [], rHand = [];
  roundPositions = [];
  draft = [];
  userDoneS = false, userDoneR = false;
  roundFinished = false;
  fillUpCards();
  addToElement("sInfo", "Sprinteur (" + sprinteur.length + ")");
  addToElement("rInfo", "Rouleur (" + rouleur.length + ")");
  drawCards(sprinteur);
  drawCards(rouleur);
  turn++;
  showTurn();
}

function endRound() {
  //sout(track.matrix);
  if (!checkUserDone()) {
    alert("You have not moved all of your available riders!");
  } else {
    riders = getRiderOrder();
    setTimeout(function() {
      moveAI();
    }, 100);
    setTimeout(function() {
      checkFinished();
    }, 5000);
    
    setTimeout(function() {
      updateDraft();
    }, 6000);
    setTimeout(function() {
      checkFatigue()
    }, 6500);
    setTimeout(function() {
      putHandInDeck(sHand, sprinteur);
      putHandInDeck(rHand, rouleur);
      newRound();
    }, 6700);
  }
}

function checkUserDone() {
  if (sDone && rDone) {
    sprinteur = [];
    rouleur = [];
    return "both";
  } else if (sDone && userDoneR) {
    sprinteur = [];
    return "s";
  } else if (rDone && userDoneS) {
    rouleur = [];
    return "r";
  } else if (userDoneS && userDoneR) {
    return "round";
  } else {
    return false;
  }
}


/*
 * MOVEMENT
 */

function moveAI() {
  peloCard = drawOneCard(peloton);
  var promises = [];
  sout("------>"  + promises.length)
  
  riders.forEach(function(el, index) {
    if (el.control == "player") {
      setTimeout(function() {
        //sout("skipping user move");
        promises.push("1");
      }, 0)
    } else {
      //sout("-> " + el.name);
      setTimeout(function() {
        moveSingleAI(el);
        promises.push("1");
      }, index * 700)
    }
  });
}

function moveSingleAI(r) {
  var sCard;
  var rCard;
  //sout("-> " + r.name);

  if (r.control == "muscle1" && r.role == "s") {
    sCard = drawOneCard(muscleSprinteur1);
    r.move(sCard, riders, track);
  } else if (r.control == "muscle1" && r.role == "r") {
    rCard = drawOneCard(muscleRouleur1);
    r.move(rCard, riders, track);
  } else if (r.control == "muscle2" && r.role == "s") {
    sCard = drawOneCard(muscleSprinteur2);
    r.move(sCard, riders, track);
  } else if (r.control == "muscle2" && r.role == "r") {
    rCard = drawOneCard(muscleRouleur2);
    r.move(rCard, riders, track);
  } else if (r.control == "peloton") {
    sout(">>>>>> " + r.name + ": " + peloCard);
    if (peloCard == 92) {
      sout("Peloton: ATTACK!");
      if (r.role == "r") {
        r.move(2, riders, track);
      } 
      if (r.role == "s") {
        r.move(9, riders, track);
      }
    } else {
      r.move(peloCard, riders, track);
    }
  }
}

function updateDraft() {
  sout("-> updatig draft");
  for (var i = 0; i < riders.length; i++) {
    if (checkDraft()) {
      moveDraft();
    }
  }
}

function checkDraft() {
  draft = [];
  riders.forEach(r => {
    if ((track.matrix[r.pos[0] + 2][0] == "x") && track.matrix[r.pos[0] + 1][0] != "x" && r.pos[0] < finishLineAt) {
      draft.push(r);
    }
  });
  return true;
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
  var racers = getRiderOrder();
  racers.forEach(r => {
    if (r.control == "player") {
      if (track.matrix[r.pos[0] + 2][0] != "x" && track.matrix[r.pos[0] + 1][0] != "x" && r.pos[0] < finishLineAt) {
        if (r.role == "s") {
          report += "Sprinteur received a fatigue card! "
          sprinteur.push('f');
        }
        if (r.role == "r") {
          report += "Rouleur received a fatigue card! "
          rouleur.push('f');
        }
      }
    }
  });
  addToReport(report);
}




/**
 * 
 * CARDS
 */

function drawOneCard(type) {
  return type.pop();
}

function hideCards(type) {
  for (var i = 0; i < 4; i++) {
    if (type == sprinteur) {
      showHand("s", [], i);
    } else {
      showHand("r", [], i);
    }
  }
}

function drawCards(type) {
  var hand = [];
  for (var i = 0; i < 4; i++) {
    hand.push(type[i]);
  }
  type.splice(0, 4);

  for (var i = 0; i < 4; i++) {
    if (type == sprinteur && !sDone) {
      showHand("s", hand, i);
      sHand.push(hand[i])
    } else if (type == rouleur && !rDone) {
      showHand("r", hand, i);
      rHand.push(hand[i])
    }
  }
}

function showHand(type, hand, i) {
  var btn = document.getElementById(type + i);
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

function putHandInDeck(hand, type) {
  for (var i = 0; i < hand.length; i++) {
    type.push(hand[i]);
  }
}

// get choice from html buttons
function getChoice(rider, move) {
  if (rider == "s") {
    sHand.splice(sHand.indexOf(parseInt(move)), 1);
    rs.move(move, riders, track);
    hideCards(sprinteur);
    sout(sHand + ": " + sprinteur);
    //sprinteur.push(sHand);
    userDoneS = true;
  } else if (rider == "r") {
    rHand.splice(rHand.indexOf(parseInt(move)), 1);
    rr.move(move, riders, track);
    hideCards(rouleur);
    sout(rHand + ": " + rouleur); 
    //rouleur.push(rHand);
    userDoneR = true;
  }
}

function fillUpCards() {
  if (peloton.length == 0) {
    peloton = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 92];
    shuffle(peloton);
  }
  if (muscleRouleur1.length == 0) {
    muscleRouleur1 = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
    shuffle(muscleRouleur1);
  }
  if (muscleRouleur2.length == 0) {
    muscleRouleur2 = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
    shuffle(muscleRouleur2);
  }
  if (muscleSprinteur1.length == 0) {
    muscleSprinteur1 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
    shuffle(muscleSprinteur1);
  }
  if (muscleSprinteur2.length == 0) {
    muscleSprinteur2 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
    shuffle(muscleSprinteur2);
  }
}




function getRiderOrder() {
  var order = [];
  for (var i = track.length-1; i > 0; i--) {
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
  for (var i = track.length-1; i > track.length - 6; i--) {
    for (var j = 0; j < 2; j++) {
      riders.forEach(rider => {
        if (rider.pos[0] == i && rider.pos[1] == j) {
          if (rider.control == "player" && rider.role == "s") {
            sDone = true;
          } else if (rider.control == "player" && rider.role == "r") {
            rDone = true;
          }
          
          ridersFinished.push(rider);
          f.innerHTML += "| " + ridersFinished.length + ": " + rider.name + " (" + turn + ")" + " |";
          removeFinished(rider);
        }
      });
    }
  }
}

function removeFinished(rider) {
  track.matrix[rider.pos[0]] = ["_", "_"];
  riders.splice(riders.indexOf(rider), 1);
}

