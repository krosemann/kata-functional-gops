import { Card, SequenceOfCards } from "./sequenceOfCards";
import { Player } from "./player";

export class Turns {
  constructor(readonly all: Turn[]) {
  }

  get lastPlayedTurn(): Turn {
    if(this.all.length === 0) throw Error('no turn has been played yet')
    return this.all[this.all.length - 1] as Turn
  }

  get hasNextTurn() {
    return this.lastPlayedTurn.hasNextTurn
  }

  playNext(): Turns {
    return new Turns([...this.all, this.lastPlayedTurn.nextTurn()])
  }
}

export class Turn {

  constructor(
    readonly turnNumber: number,
    private readonly scoreCards: SequenceOfCards,
    readonly previouslyRevealedCards: Card[],
    readonly player1: Player,
    readonly player2: Player) {
  }

  get hasNextTurn(): boolean {
    return this.scoreCards.hasNextCard
  }

  get currentCard(): Card {
    return this.scoreCards.currentCard
  }

  get score(): number {
    return this.previouslyRevealedCards
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
      this.scoreCards.currentCardPlayed(),
      this.result.outcome === "DRAW" ? [...this.previouslyRevealedCards, this.currentCard] : [],
      this.player1.turnScored(this.result.player1Score),
      this.player2.turnScored(this.result.player2Score)
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
    return this.player1.hasHigherRankedCardThan(this.player2)
      ? 'PLAYER_1_WON'
      : this.player2.hasHigherRankedCardThan(this.player1)
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
