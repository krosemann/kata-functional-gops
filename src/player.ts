import { Card, SequenceOfCards } from './sequenceOfCards'

export class Player {

  constructor(readonly score: number, private readonly cards: SequenceOfCards) {
  }

  nextCard(): Card {
    return this.cards.nextCard()
  }

  onTurnScored(scoredPoints: number): Player {
    return new Player(this.score + scoredPoints, this.cards.afterNextCardPlayed())
  }
}