import { Card, SequenceOfCards } from "./sequenceOfCards";
import { Player } from "./player";

interface Hands {
  readonly dealer: SequenceOfCards
  readonly player1: Player
  readonly player2: Player
}

export class Turn {

  readonly scoreCards: SequenceOfCards
  readonly player1: Player
  readonly player2: Player

  constructor(readonly turnNumber: number, readonly revealedCards: Card[], hands: Hands) {
    this.scoreCards = hands.dealer
    this.player1 = hands.player1
    this.player2 = hands.player2
  }

  get hasNextTurn(): boolean {
    return this.scoreCards.hasNextCard()
  }

  get currentCard(): Card {
    return this.scoreCards.nextCard()
  }

  get player1Card(): Card {
    return this.player1.nextCard()
  }

  get player2Card(): Card {
    return this.player2.nextCard()
  }

  get score(): number {
    return this.revealedCards
      .map(it => it.value)
      .reduce(
        (aggregate, value) => aggregate + value,
        this.currentCard.value
      )
  }

  get result(): TurnResult {
    return new TurnResult(this.score, this.player1Card, this.player2Card)
  }

  nextTurn(): Turn {
    return new Turn(
      this.turnNumber + 1,
      this.result.outcome === "DRAW" ? [...this.revealedCards, this.currentCard] : [],
      {
        dealer: this.scoreCards.afterNextCardPlayed(),
        player1: this.player1.onTurnScored(this.result.player1Score),
        player2: this.player2.onTurnScored(this.result.player2Score)
      }
    )
  }
}

class TurnResult {

  constructor(
    private readonly score: number,
    private readonly card1: Card,
    private readonly card2: Card) {
  }

  get outcome(): 'PLAYER_1_WON' | 'PLAYER_2_WON' | 'DRAW' {
    return this.card1.isHigherRankedThan(this.card2)
      ? 'PLAYER_1_WON'
      : this.card2.isHigherRankedThan(this.card1)
        ? "PLAYER_2_WON"
        : 'DRAW'
  }

  get player1Score(): number {
    return this.outcome === 'PLAYER_1_WON' ? this.score : 0
  }

  get player2Score(): number {
    return this.outcome === 'PLAYER_2_WON' ? this.score : 0
  }
}
