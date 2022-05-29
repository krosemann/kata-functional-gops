import { Card, SequenceOfCards } from "./sequenceOfCards";
import { Player } from "./player";

export class Turn {

  readonly scoreCards: SequenceOfCards
  readonly player1: Player
  readonly player2: Player

  constructor(readonly turnNumber: number, readonly revealedCards: Card[], hands: Hands) {
    this.scoreCards = hands.dealer
    this.player1 = hands.player1
    this.player2 = hands.player2
  }

  get currentCard(): Card {
    return this.scoreCards.nextCard()
  }

  play(): Turn {
    console.log(`Turn ${this.turnNumber} with bounty:`, this.currentCard)

    const card1 = this.player1.nextCard()
    const card2 = this.player2.nextCard()
    console.log('Player\'s bet:', card1, 'vs', card2)

    const winner = Turn.winner(card1, card2)

    return new Turn(
      this.turnNumber + 1,
      winner === "DRAW" ? [...this.revealedCards, this.currentCard] : [],
      {
        dealer: this.scoreCards.afterNextCardPlayed(),
        player1: this.player1.onTurnScored(winner === 'PLAYER_1_WON' ? this.score : 0),
        player2: this.player2.onTurnScored(winner === 'PLAYER_2_WON' ? this.score : 0)
      }
    )
  }

  get score(): number {
    return this.revealedCards
      .map(it => it.value)
      .reduce((aggregate, value) => aggregate + value, this.currentCard.value)
  }

  hasNextTurn(): boolean {
    return this.scoreCards.hasCards()
  }

  private static winner(card1: Card, card2: Card): TurnResult {
    return card1.isHigherRankedThan(card2)
      ? 'PLAYER_1_WON'
      : card2.isHigherRankedThan(card1)
        ? "PLAYER_2_WON"
        : 'DRAW'
  }
}

interface Hands {
  readonly dealer: SequenceOfCards
  readonly player1: Player
  readonly player2: Player
}

type TurnResult = 'PLAYER_1_WON' | 'PLAYER_2_WON' | 'DRAW'