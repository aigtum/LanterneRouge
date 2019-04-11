/**
 * Riders
 */

class Rider {
    width = 26;
    height = 16;
    
    choice = -1;
    hand = [];
    color;

    constructor(id, teamid, name, x, y, role, pos, cards, control) {
        this.id = id;
        this.teamid = teamid;
        this.name = name;
        this.x = x;
        this.y = y;
        this.role = role;
        this.pos = pos;
        this.cards = cards;
        this.control = control;
        this.finished = false;
        this.deck = new Cards(cards);
    }

    getNewHand() {
        this.hand = this.deck.drawCards();
    }

    getNewCard() {
        this.choice = this.deck.drawOneCard();
    }

    addCards(cards) {
        if (cards.length == 1) {
            this.deck.addCardsToDeck(cards);
        } else {
            for (c of cards) {
                this.deck.addCardsToDeck(c);
            }
        }
    }

    moveDown(pos, track) {
        track.matrix[this.pos[0]][this.pos[1]] = ["_", "_"];    
        this.pos = [pos[0], 0];
    }

    checkFinished(track) {
        if (this.pos[0] > track.length-6) {
            this.finished = true;
            //track.matrix[this.pos[0]] = ["_", "_"];
            sout(">>>>> " + this.name + " finished!" + this.pos);
        }
        //sout(track.matrix);
    }

    // TODO: put cards back in deck
    setChoice(choice) {
        this.choice = choice;

        sout("Choice hand" + this.hand)
        this.hand.splice(this.hand.indexOf(choice)-1, 1);
        sout("Splice hand" + this.hand + "/" + choice)
        
        this.addCards(this.hand);
    }

    getChoice() {
        if (control == "player"){
            this.choice = deck.drawOneCard()
        }
        return this.choice
    }

    checkBusy(pos, riders) {
        console.log("> Checking: " + pos);
        var counter = 0;
        for (var i = 0; i < riders.length; i++) {
            //console.log(i + " riders position: " + riders[i].pos + " own position: " + pos);
            //console.log(riders[i].pos[0] != pos[0] && riders[i].pos[1] != pos[1] );
            if (riders[i].pos[0] == pos[0] && riders[i].pos[1] == pos[1] && pos[1] == 0) {
                //console.log("blocked down");
                return this.checkBusy([parseInt(pos[0]), 1], riders);
            } else if (riders[i].pos[0] == pos[0] && riders[i].pos[1] == pos[1] && pos[1] == 1) {
                //console.log("blocked up");
                return this.checkBusy([parseInt(pos[0]) - 1, 0], riders);
            }
            else if (counter == riders.length-1) {
                //console.log(">Setting: " + pos);
                return pos;
            } 
            counter++;
        }
    }

    move(steps, riders, track) {
        sout("Moving: " + this.name + ", " + steps);
        var currPos = parseInt(this.pos[0]);
        track.matrix[this.pos[0]][this.pos[1]] = ["_", "_"];
        var newPos = [currPos + parseInt(steps), 0];
        var emptyPos = this.checkBusy(newPos, riders);
        if (this.pos[0] + steps < track.length-1) {
            var typeOfTiles = track.getTileTypes(this.pos[0], steps);
        } else {
            var typeOfTiles = track.getTileTypes(this.pos[0], track.length-this.pos[0]);
        }
        sout("Tile types: " + typeOfTiles);
        
        //sout("> " + emptyPos[0] + ", " + track.length);
        if (emptyPos[0] > track.length-1) {        // if the rider is ouside of the track
            sout(">> endoftrack: rider outside of track");
            this.move(track.length-this.pos[0]-1, riders, track);
        } else if (typeOfTiles.indexOf('u') != -1 && steps > 5) {        // if riders pass uphill
            sout(">> uphill: move max 5");
            this.move(5, riders, track);
        } else if (track.getTile(this.pos[0], this.pos[1]).type == 'd' && steps < 5) {         // if riders are on downhill
            sout(">> downhill: move min 5");
            this.move(5, riders, track);
        } else if (emptyPos[0] >= this.pos[0] && emptyPos[0] < track.length) {     // if the rider is not finished
            sout(">> normal: rider not finished");
            track.matrix[emptyPos[0]][emptyPos[1]] = 'x';
            this.pos = emptyPos;
        } 
         else if (emptyPos[0] < this.pos[0]) {         // if the rider is placed backwards
            // do nothing, keep the rider in place
            this.move(0, riders, track);
        }
        this.checkFinished(track);
        //sout("__________" + "\n" + track.matrix +"\n__________");
    }

    show(x, y) {
        fill(this.color);
        rect(x + 2, y + 2, this.width, this.height, 6, 6, 6, 6);
        fill("black");
        if (this.control == "peloton") {
            textFont('Josefin Sans');
            text("p"+this.role, x + 8, y + 4, 22, 22);
        } else if (this.control == "muscle1" || this.control == "muscle2") {
            textFont('Josefin Sans');
            text("m"+this.role, x + 8, y + 4, 22, 22);
        } else {
            textFont('Josefin Sans');
            text(this.role, x + 12, y + 4, 22, 22);
        }
    }
}