import { Card, SequenceOfCards } from './sequenceOfCards'

export class Player {

  constructor(readonly score: number, private readonly cards: SequenceOfCards) {
  }

  get currentCard(): Card {
    return this.cards.currentCard
  }

  turnScored(newScore: number): Player {
    return new Player(newScore, this.cards.currentCardPlayed())
  }
}
