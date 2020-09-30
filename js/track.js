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

    addTileToTrack(i, j, tilesPerLength, lineNum, direction, type) {
        var tile;
        if (direction == 1) {
            if (j == 0) {
                tile = new Tile(
                    this.x + (i - tilesPerLength * (lineNum - 1)) * this.tileWidth,
                    this.y*2 + (lineNum - 1) * this.tileHeight * 3.3 + this.tileHeight,
                    this.tileWidth,
                    this.tileHeight,
                    [i, j],
                    type,
                    direction
                    );
            } else if (j == 1) {
                tile = new Tile(
                    this.x + (i - tilesPerLength * (lineNum - 1)) * this.tileWidth,
                    this.y*2 + (lineNum - 1) * this.tileHeight * 3.3,
                    this.tileWidth,
                    this.tileHeight,
                    [i, j],
                    type,
                    direction
                );
            }
        }
        if (direction == -1) {
            if (j == 0) {
                tile = new Tile(
                    //((tilesPerLength-1) * this.tileWidth) + (this.x + ((tilesPerLength * this.tileWidth)) - (i + tilesPerLength * (lineNum - 1))*this.tileWidth),
                    (tilesPerLength * this.tileWidth) - ((i - tilesPerLength * (lineNum - 1)) * this.tileWidth)-(this.tileWidth*0.153),
                    this.y*2 + (lineNum - 1) * this.tileHeight * 3.3 + this.tileHeight,
                    this.tileWidth,
                    this.tileHeight,
                    [i, j],
                    type,
                    direction
                    );
            } else if (j == 1) {
                tile = new Tile(
                    tilesPerLength * this.tileWidth - ((i - tilesPerLength * (lineNum - 1)) * this.tileWidth)-(this.tileWidth*0.153),
                    this.y*2 + (lineNum - 1) * this.tileHeight * 3.3,
                    this.tileWidth,
                    this.tileHeight,
                    [i, j],
                    type,
                    direction
                    );            
            }
        }
        if ((i % (tilesPerLength) == 0) && i > 0 && i < this.length-1) {
            tile.corner = true;
        }


        this.tiles[i][j] = tile;
        
        return tile;
    }

    show(riders) {
        var tilesPerLength = Math.floor(windowWidth / this.tileWidth - 1);
        var lineNum = 0;
        var tile;
        let direction = -1
        for (var i = 0; i < this.trackProfile.length; i++) {
            if (i % tilesPerLength == 0) {
                lineNum += 1;
                direction *= -1;
            }
            for (var j = 0; j < 2; j++) {
                tile = this.addTileToTrack(i, j, tilesPerLength, lineNum, direction, this.trackProfile[i]);
                
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
    constructor(x, y, width, height, num, type, direction) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.num = num;
        this.type = type;
        this.corner = false;
        this.direction = direction;
    }

    getTileType() {
        return this.type;
    }

    addCorner() {
        if (this.corner == true) {
            if (this.direction == -1) {
                if (this.num[1] == 0) {
                    rect(this.x, this.y-this.height*0.3, this.width, this.height*2.3, 0, 0, 360, 0);
                } 
                if (this.num[1] == 1) {
                    rect(this.x+this.width*0.7, this.y-2.3*this.height, this.width*0.3, this.height*3.3, 0, 90, 0, 0);
                }
            } else {
                if (this.num[1] == 0) {
                    rect(this.x, this.y-this.height*0.3, this.width, this.height*2.3, 0, 0, 0, 30);
                } 
                if (this.num[1] == 1) {
                    rect(this.x, this.y-2.3*this.height, this.width*0.3, this.height*3.3, 90, 0, 0, 0);
                }
            }
        }
    }

    addGrass() {
        if(this.num[0,1] == 0) {
            stroke("green");
            fill("green");
            rect(this.x, this.y+this.height, this.width, this.height/3.5);
        } else {
            stroke("green");
            fill("green");
            rect(this.x, this.y-this.height/3.5, this.width, this.height/3.5);
        }
    }

    show() {
        
        if (this.corner == true) {
            this.y -= this.height;
        }
        this.addGrass();
        
        if (this.type == "s" || this.type == "f") {
            stroke("black");
            fill("yellow");
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "u") {
            stroke("black");
            fill("salmon");
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "d") {
            stroke("black");
            fill(64, 64, 182);
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "c") {
            stroke("black");
            fill(200, 200, 100);
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            rect(this.x, this.y, this.width, this.height);
        } else if (this.type == "r") {
            stroke("black");
            fill("lightblue");
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            rect(this.x, this.y, this.width, this.height);
        } else {
            stroke("black");
            fill(220, 220, 220);
            this.addCorner(this.corner, this.x, this.y, this.width, this.height);
            stroke("black");
            rect(this.x, this.y, this.width, this.height);
        }

        
        
        
        
        
        
        
        //fill("black");
        //text(this.num[0], this.x + this.width / 2 + 2, this.y + this.height / 2 + 2);

        
    }
}