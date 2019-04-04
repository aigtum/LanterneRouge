/**
 * Riders
 */

class Rider {
    width = 26;
    height = 16;

    constructor(name, x, y, color, role, pos, cards, control) {
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.role = role;
        this.pos = pos;
        this.cards = cards;
        this.control = control;
        this.finished = false;
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

    checkBusy(pos, riders) {
        //console.log("> Checking: " + pos);
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
        var currPos = parseInt(this.pos[0]);
        track.matrix[this.pos[0]][this.pos[1]] = ["_", "_"];
        var newPos = [currPos + parseInt(steps), 0];
        var emptyPos = this.checkBusy(newPos, riders);

        sout("> " + emptyPos[0] + ", " + track.length);

        if (emptyPos[0] >= this.pos[0] && emptyPos[0] < track.length) {     // if the rider is not finished
            track.matrix[emptyPos[0]][emptyPos[1]] = 'x';
            this.pos = emptyPos;
        } else if (emptyPos[0] < this.pos[0]) {         // if the rider is placed backwards
            // do nothing, keep the rider in place
        }
        this.checkFinished(track);
    }

    drawMovement(newPos) {
        while (this.pos[0] <= newPos[0]) {
            this.pos[0]++;
        }
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