import { Card, SequenceOfCards } from "./sequenceOfCards";
import { Player } from "./player";

export class Turn {

  constructor(
    readonly turnNumber: number,
    readonly scoreCards: SequenceOfCards,
    readonly revealedCards: Card[],
    readonly player1: Player,
    readonly player2: Player) {
  }

  get hasNextTurn(): boolean {
    return this.scoreCards.hasNextCard()
  }

  get currentCard(): Card {
    return this.scoreCards.nextCard()
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
    return new TurnResult(this.score, this.player1, this.player2)
  }

  nextTurn(): Turn {
    return new Turn(
      this.turnNumber + 1,
      this.scoreCards.afterNextCardPlayed(),
      this.result.outcome === "DRAW" ? [...this.revealedCards, this.currentCard] : [],
      this.player1.onTurnScored(this.result.player1Score),
      this.player2.onTurnScored(this.result.player2Score)
    )
  }
}

class TurnResult {

  constructor(
    private readonly score: number,
    private readonly player1: Player,
    private readonly player2: Player) {
  }

  get outcome(): 'PLAYER_1_WON' | 'PLAYER_2_WON' | 'DRAW' {
    return this.player1.nextCard().isHigherRankedThan(this.player2.nextCard())
      ? 'PLAYER_1_WON'
      : this.player2.nextCard().isHigherRankedThan(this.player1.nextCard())
        ? "PLAYER_2_WON"
        : 'DRAW'
  }

  get player1Score(): number {
    return this.player1.score + (this.outcome === 'PLAYER_1_WON' ? this.score : 0)
  }

  get player2Score(): number {
    return this.player2.score + (this.outcome === 'PLAYER_2_WON' ? this.score : 0)
  }
}
