export class Cards {

  private readonly cards: Card[]

  constructor(denominations: string[]) {
    this.cards = denominations.map((d, index) => new Card(d, index+1))
  }

  popRandomCard(): Card {
    if (!this.hasCards()) throw 'deck of cards is empty'

    const randomIndex = Math.floor(Math.random() * this.cards.length)
    const card = this.cards[randomIndex]
    this.cards.splice(randomIndex, 1)

    // @ts-ignore checked by this.hasCards()
    return card
  }

  removeCard(card: Card) {
    const index = this.cards.findIndex(c => c.denomination === card.denomination)
    if (index >= 0) this.cards.splice(index, 1)
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
