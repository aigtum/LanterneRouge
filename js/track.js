/**
 * Track 
 */

class Track {
    tileWidth = 30;
    tileHeight = 20;
    riderOrder = [];

    constructor(x, y, length, set) {
        this.matrix = [];
        for (var i = 0; i < length; i++) {
            this.matrix[i] = new Array(2);
        }
        this.x = x;
        this.y = y;
        this.length = length;
        this.set = set;
        this.trackProfile = this.buildTrack();
        this.tiles = [];
        for (var i = 0; i < length; i++) {
            this.tiles[i] = new Array(2);
        }
    }

    getTile(i, j) {
        return this.tiles[i][j];
    }

    getTileTypes(start, steps) {
        sout("Start: " + start + ", Steps: " + steps)
        var types = [];
        for (var i = 0; i < steps; i++) {
            //sout(i + ": " + this.getTile(start+i, 0).type);
            types.push(this.getTile(start+i, 0).type);
            
        }
        return types;
    }

    buildTrack() {
        var trackProfile = [];
        for (var i = 0; i < this.set.length; i++) {
            for (var j = 0; j < this.set[i].length; j++) {
                trackProfile.push(this.set[i][j]);
            }
        }
        //sout(trackProfile); 
        return trackProfile;
    }

    addTileToTrack(i, j, tilesPerLength, lineNum, type) {
        var tile;
        if (j == 0) {
            tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3 + 20, this.tileWidth, this.tileHeight, [i, j], type);
        } else if (j == 1) {
            tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3, this.tileWidth, this.tileHeight, [i, j], type);
        }
        this.tiles[i][j] = tile;
        return tile;
    }

    show(riders) {
        var tilesPerLength = Math.floor(windowWidth / this.tileWidth);
        var lineNum = 0;
        var tile;
        for (var i = 0; i < this.trackProfile.length; i++) {
            if (i % tilesPerLength == 0) {
                lineNum += 1;
            }
            for (var j = 0; j < 2; j++) {
                tile = this.addTileToTrack(i, j, tilesPerLength, lineNum, this.trackProfile[i]);
                tile.show();
                
                riders.reverse().forEach(rider => {
                    if (i == rider.pos[0] && j == rider.pos[1]) {
                        this.riderOrder.push(rider);
                        this.matrix[i][j] = 'x';
                        rider.show(tile.x, tile.y);
                    } else if (this.matrix[i][j] != 'x') {
                        this.matrix[i][j] = '_';
                    }
                });
            }
        }
    }
}


class Tile {
    /**
     * Types:
     * s = start
     * f = finish
     * u = uphill
     * d = downhill
     * c = cobblestone
     * r = refill/supply zones
     */
    constructor(x, y, width, height, num, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.num = num;
        this.type = type;
    }

    getTileType() {
        return this.type;
    }

    show() {
        if (this.type == "s" || this.type == "f") {
            fill("yellow");
        } else if (this.type == "u") {
            fill("salmon");
            stroke("darkred");
        } else if (this.type == "d") {
            fill("lightblue");
            stroke("blue")
        } else if (this.type == "c") {
            fill(200, 200, 100);
        } else if (this.type == "r") {
            stroke(100, 200, 220);
        } else {
            stroke("black");
            fill(220, 220, 220);
        }
        rect(this.x, this.y, this.width, this.height);

        //fill("black");
        //text(this.num, this.x + 5, this.y + 5, 15, 15);

    }
}