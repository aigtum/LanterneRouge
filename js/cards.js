class Cards {

    sHand = [];
    rHand = [];
    peloCard;
    // TODO: riders of peloton should have a shared deck!

    shuffle() {
        var j, x, i;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
    }

    constructor(type) {
        this.type = type;
        if (this.type == 'rouleur') {
            this.deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
        } else if (this.type == 'sprinteur') {
            this.deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9];
        } else if ("peloton") {
            this.deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 92];
        } else if ("muscleRouleur") {
            this.deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
        } else if ("muscleSprinteur") {
            this.deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
        }
        this.shuffle();
    }


    drawOneCard() {
        var result = this.deck.pop();
        this.deck.push(result);
        return result;
    }

    drawCards() {   
        var hand = [];     
        for (var i = 0; i < 4; i++) {
            this.hand.push(this.deck[i]);
        }
        this.deck.splice(0, 4);
        return hand;
    }
}

