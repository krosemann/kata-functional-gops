export class SequenceOfCards {

  private readonly cards: Card[]

  constructor(sequence: Card[]) {
    this.cards = [...sequence]
  }

  nextCard(): Card {
    if(!this.hasCards()) throw new Error('sequence has no cards left')
    return this.cards[0] as Card
  }

  afterNextCardPlayed() {
    return new SequenceOfCards(this.cards.filter((_, index) => index !== 0))
  }

  hasCards(): boolean {
    return this.cards.length > 0
  }
}

export class Card {
  constructor(readonly denomination: string, readonly value: number) {
  }

  isHigherRankedThan(other: Card): boolean {
    return this.value > other.value
  }
}
