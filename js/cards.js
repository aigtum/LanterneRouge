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

    // Add all cards to used cards pile
    for (let card of cards) {
      this.usedCards.push(card);
    }

    print(
      "Deck: ",
      this.deck,
      " / Used: ",
      this.usedCards,
      " / Burnt: ",
      this.burntCards
    );
  }

  drawCards() {
    var hand = [];

    // If we don't have enough cards in the deck, try to refill from used cards
    if (this.deck.length < 4 && this.usedCards.length > 0) {
      print(
        "ROLE: ",
        this.type,
        "Less than 4 cards available - shuffling used"
      );

      // Shuffle used cards back into deck
      for (c of this.usedCards) {
        this.deck.push(c);
      }
      this.shuffle();

      // Clear used cards after shuffling them back
      this.usedCards = [];
    }

    // If we still don't have enough cards, create a new deck
    if (this.deck.length < 4) {
      print("Deck empty - refilling");
      this.deck = this.addNewCardsToDeck(this.type, this.exhaustion);
      this.shuffle();
    }

    // Draw 4 cards
    for (var i = 0; i < 4; i++) {
      hand.push(this.deck[i]);
    }
    this.deck.splice(0, 4);

    return hand;
  }
}
