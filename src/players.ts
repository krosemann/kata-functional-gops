import { Card, SequenceOfCards } from './sequenceOfCards'

export class Player {

  constructor(readonly score: number, private readonly cards: SequenceOfCards) {
  }

  withScoredPoints(value: number): Player {
    return new Player(this.score + value, this.cards)
  }

  nextCard(): Card {
    return this.cards.nextCard()
  }

  afterNextCardPlayed(): Player {
    return new Player(this.score, this.cards.afterNextCardPlayed())
  }
}