import { Card, SequenceOfCards } from './sequenceOfCards'

export class Player {

  constructor(readonly score: number, private readonly cards: SequenceOfCards) {
  }

  nextCard(): Card {
    return this.cards.nextCard()
  }

  onTurnScored(newScore: number): Player {
    return new Player(newScore, this.cards.afterNextCardPlayed())
  }
}
