/**
 * Track 
 */

class Track {
    
    constructor(x, y, set) {
        this.name = set[0];
        this.set = set[1];
        this.trackInfo = this.getTrackLength();
        this.length = this.trackInfo[0];
        this.startLineAt = this.trackInfo[1];
        this.finishLineAt = this.trackInfo[2];
        if (width > 1000) {
            this.tileWidth = (width-10)/this.length*3;
            this.tileHeight = this.tileWidth/1.5;
        } else {
            this.tileWidth = (width-5)/this.length*4;
            this.tileHeight = this.tileWidth/1.5;
        }
        this.riderOrder = [];
        this.matrix = [];
        for (var i = 0; i < this.length; i++) {
            this.matrix[i] = new Array(2);
        }
        this.x = x;
        this.y = y;
        this.trackProfile = this.buildTrack();
        this.tiles = [];
        for (var i = 0; i < this.length; i++) {
            this.tiles[i] = new Array(2);
        }
    }

    getTile(i, j) {
        return this.tiles[i][j];
    }

    getTileTypes(start, steps) {
        var types = [];
        for (var i = 0; i < steps; i++) {
            types.push(this.getTile(start+i, 0).type);
        }
        return types;
    }

    getTrackLength() {
        var counter = 0;
        var startLine = 0;
        var finishLine = 0;
        for (var i = 0; i < this.set.length; i++) {
            for (var j = 0; j < this.set[i].length; j++) {
                if (this.set[i][j] == "s") {
                    startLine++;
                } else if (this.set[i][j] == "f") {
                    finishLine++;
                }
                counter++;
            }
        } 
        return [counter, startLine, counter-finishLine];
    }

    buildTrack() {
        var trackProfile = [];
        for (var i = 0; i < this.set.length; i++) {
            for (var j = 0; j < this.set[i].length; j++) {
                trackProfile.push(this.set[i][j]);
            }
        }
        return trackProfile;
    }

    addTileToTrack(i, j, tilesPerLength, lineNum, type) {
        var tile;
        if (j == 0) {
            tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3, this.tileWidth, this.tileHeight, [i, j], type);
        } else if (j == 1) {
            tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3- this.tileHeight, this.tileWidth, this.tileHeight, [i, j], type);
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
        if(this.num[0,1] == 0) {
            fill("green");
            rect(this.x, this.y+this.width/5, this.width, this.height);
        } else {
            fill("green");
            rect(this.x, this.y-this.width/5, this.width, this.height);
        }
        if (this.type == "s" || this.type == "f") {
            fill("yellow");
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "u") {
            fill("salmon");
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "d") {
            fill(64, 64, 182);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "c") {
            fill(200, 200, 100);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "r") {
            stroke("lightblue");
            rect(this.x, this.y, this.width, this.height);
        } else {
            fill(220, 220, 220);
            rect(this.x, this.y, this.width, this.height);
        }
        //fill("black");
        //text(this.num[0], this.x + this.width / 2 + 2, this.y + this.height / 2 + 2);

        
    }
}