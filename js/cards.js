class Cards {
  constructor(type, exhaustion) {
    this.type = type;
    this.deck = this.addNewCardsToDeck(type, exhaustion);
    this.usedCards = [];
    this.burntCards = [];
    this.shuffle();
    this.exhaustion = exhaustion;
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

  addNewCardsToDeck(type, exhaustion) {
    print("Exhaustion ", exhaustion);
    let deck;
    if (type == "rouleur") {
      deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
    } else if (type == "sprinteur") {
      deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9];
    } else if (type == "peloton") {
      deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 92, 92];
    } else if (type == "muscleRouleur") {
      deck = [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
    } else if (type == "muscleSprinteur") {
      deck = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9];
    }
    if (exhaustion > 0) {
      for (let i = 0; i < exhaustion; i++) {
        if (type === "rouleur" || type === "sprinteur") {
          deck.push("f");
        } else {
          deck.push(2);
        }
      }
    }
    print(" ==> New cards in deck: ", deck);
    return deck;
  }

  addCardsToDeck(cards) {
    this.deck.push(cards);
  }

  drawOneCard() {
    var result = this.deck.pop();
    //this.deck.unshift(result);
    sout(
      "--- Drawing cards: " +
        this.type +
        ", " +
        result +
        " / " +
        this.deck +
        " (" +
        this.deck.length +
        ") "
    );
    return result;
  }

  addCards(cards) {
    print("Cards: " + cards);
    if (this.deck.length == 0 && this.usedCards.length == 0) {
      // No cards left
      print("Deck empty - refilling");
      this.addNewCardsToDeck(this.type);
    } else if (
      this.deck.length < 4 &&
      this.usedCards.length + cards.length > 0
    ) {
      print(
        "ROLE: ",
        this.type,
        "Less than 4 cards available - shuffling used"
      );

      for (c of cards) {
        this.deck.push(c);
      }
      for (c of this.usedCards) {
        this.deck.push(c);
      }
      this.shuffle();

      this.usedCards = [];
    } else {
      for (c of cards) {
        this.usedCards.push(c);
      }
      print("Putting hand in used ->", this.deck, " / ", this.usedCards);
    }
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
