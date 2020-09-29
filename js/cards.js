class Cards {

    constructor(type) {
        this.type = type;
        this.deck = this.addNewCardsToDeck(type);
        this.usedCards = [];
        this.shuffle();
    }

    shuffle() {
        var j, x, i;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
    }

    addNewCardsToDeck(type) {
        let deck;
        if (type == 'rouleur') {
            deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
        } else if (type == 'sprinteur') {
            deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9];
        } else if (type == "peloton") {
            deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 92, 92];
        } else if (type == "muscleRouleur") {
            deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
        } else if (type == "muscleSprinteur") {
            deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
        }
        return deck;
    }

    addCardsToDeck(cards) {
        this.deck.push(cards);
    }

    drawOneCard() {
        var result = this.deck.pop();
        this.deck.unshift(result);
        //sout("--- Drawing cards: " + this.type + ", " + result + "/" + this.deck);
        return result;
    }

    drawCards() {
        var hand = [];
        for (var i = 0; i < 4; i++) {
            hand.push(this.deck[i]);
        }
        this.deck.splice(0, 4);
        //sout("--- Drawing cards: " + this.type +", " + hand + "/" + this.deck);
        return hand;
    }
}