export class SequenceOfCards {

  private readonly cards: Card[]

  constructor(sequence: Card[]) {
    this.cards = [...sequence]
  }

  get currentCard(): Card {
    if(this.cards.length === 0) throw new Error('sequence has no cards left')
    return this.cards[0] as Card
  }

  currentCardPlayed() {
    return new SequenceOfCards(this.cards.filter((_, index) => index !== 0))
  }

  get hasNextCard(): boolean {
    return this.cards.length > 1
  }
}

export class Card {
  constructor(readonly denomination: string, readonly value: number) {
  }

  isHigherRankedThan(other: Card): boolean {
    return this.value > other.value
  }
}
