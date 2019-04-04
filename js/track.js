/**
 * Track 
 */

class Track {
    tileWidth = 30;
    tileHeight = 20;
    riderOrder = [];

    constructor(x, y, length) {
        this.matrix = [];
        for (var i = 0; i < length; i++) {
            this.matrix[i] = new Array(2);
        }
        this.x = x;
        this.y = y;
        this.length = length;
    }

    getTile(i, j) {
        return this.matrix[i][j];
    }

    show(riders) {
        var tilesPerLength = Math.floor(windowWidth / this.tileWidth);
        var lineNum = 0;
        this.riderOrder = [];
        for (var i = 0; i < this.matrix.length; i++) {
            if (i % tilesPerLength == 0) {
                lineNum += 1;
            }
            for (var j = 0; j < 2; j++) {
                var tile;
                if (j == 0) {
                    tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3 + 20, this.tileWidth, this.tileHeight, [i, j]);
                } else if (j == 1) {
                    tile = new Tile(this.x + this.tileWidth * (i - tilesPerLength * (lineNum - 1)), this.y + this.tileHeight * (lineNum) * 3, this.tileWidth, this.tileHeight, [i, j]);
                }
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
    constructor(x, y, width, height, num) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.num = num;
    }

    show() {
        if (this.num[0] < 5 || this.num[0] > 72) {
            fill("yellow");
        } else {
            fill(220, 220, 220);
        }
        stroke(1);
        rect(this.x, this.y, this.width, this.height);

        //fill("black");
        //text(this.num, this.x + 5, this.y + 5, 15, 15);

    }
}