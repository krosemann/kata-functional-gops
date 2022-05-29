import { Card, SequenceOfCards } from './sequenceOfCards'
import { Player } from "./players";

/** GOPS Game -- https://playingcarddecks.com/blogs/how-to-play/gops-game-rules */
export class GopsGame {

  private turn = 0
  private revealedCards: Card[] = []

  constructor(
    private scoreCards: SequenceOfCards,
    private player1: Player,
    private player2: Player,
  ) {
  }

  play() {
    while (this.scoreCards.hasCards()) {
      this.playTurn()
      this.showPlayerScores()
    }

    if (this.player1.score > this.player2.score) {
      console.log('Player 1 wins!')
    } else {
      console.log('Player 2 wins!')
    } // there is no tie with 91 total points

    this.assertValidEndOfGame()
  }

  private playTurn() {
    this.turn++

    const scoreCard = this.scoreCards.nextCard()
    this.scoreCards = this.scoreCards.afterNextCardPlayed()
    this.revealedCards.unshift(scoreCard)

    console.log(`Turn ${this.turn} with bounty:`, scoreCard)

    const card1 = this.player1.nextCard()
    const card2 = this.player2.nextCard()

    console.log('Player\'s bet:', card1, 'vs', card2)

    this.player1 = this.player1.afterNextCardPlayed()
    this.player2 = this.player2.afterNextCardPlayed()

    if (card1.isHigherRankedThan(card2)) {
      this.player1 = this.player1.withScoredPoints(this.claimRevealedCardsValue())
    } else if (card2.isHigherRankedThan(card1)) {
      this.player2 = this.player2.withScoredPoints(this.claimRevealedCardsValue())
    } // tie leaves the scorecard the table for the next turn
  }

  private showPlayerScores() {
    console.log(`Scores: ${(this.player1.score)} vs ${(this.player2.score)}`)
    console.log()
  }

  private claimRevealedCardsValue(): number {
    const value = this.revealedCards.map(c => c.value).reduce((c1, c2) => c1 + c2, 0)
    this.revealedCards = []
    return value
  }

  private assertValidEndOfGame() {
    console.assert(this.turn === 13, '13 cards where played')

    console.assert(this.revealedCards.length === 0, 'no more revealed cards')

    console.assert(this.player1.score + this.player2.score === 91, 'all score cards add up to 91')
  }
}
