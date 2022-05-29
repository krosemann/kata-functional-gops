import { Card, SequenceOfCards } from './sequenceOfCards'

export abstract class Player {

  private score = 0

  constructor(protected readonly cards: SequenceOfCards) {
  }

  scorePoint(value: number) {
    this.score += value
  }

  currentScore(): number {
    return this.score
  }

  abstract playCard(scoreCard: Card): Card
}

export class RandomPlayer extends Player {

  playCard(_: Card): Card {
    return this.cards.popRandomCard()
  }
}

export class EqualPlayer extends Player {

  playCard(scoreCard: Card): Card {
    this.cards.removeCard(scoreCard)
    return scoreCard
  }
}
