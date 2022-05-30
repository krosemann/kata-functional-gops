import { Card, SequenceOfCards } from './sequenceOfCards'

export class Player {

  constructor(private readonly cards: SequenceOfCards, readonly score: number = 0) {
  }

  get currentCard(): Card {
    return this.cards.currentCard
  }

  turnScored(newScore: number): Player {
    return new Player(this.cards.currentCardPlayed(), newScore)
  }

  hasHigherRankedCardThan(otherPlayer: Player) {
    return this.currentCard.isHigherRankedThan(otherPlayer.currentCard)
  }
}
