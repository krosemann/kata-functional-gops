import { SequenceOfCards } from './sequenceOfCards'
import { Player } from "./player";
import { Turn } from "./turn";

/** GOPS Game -- https://playingcarddecks.com/blogs/how-to-play/gops-game-rules */
export class GopsGame {

  private turn: Turn

  constructor(
    scoreCards: SequenceOfCards,
    player1: Player,
    player2: Player,
  ) {
    this.turn = new Turn(
      0,
      [],
      { dealer: scoreCards, player1: player1, player2: player2 }
    )
  }

  play() {
    while (this.turn.hasNextTurn) {
      this.turn = this.turn.nextTurn()
      this.showPlayerScores()
    }

    if (this.turn.player1.score > this.turn.player2.score) {
      console.log('Player 1 wins!')
    } else {
      console.log('Player 2 wins!')
    } // there is no tie with 91 total points

    this.assertValidEndOfGame()
  }

  private showPlayerScores() {
    console.log(`Scores: ${(this.turn.player1.score)} vs ${(this.turn.player2.score)}`)
    console.log()
  }

  private assertValidEndOfGame() {
    console.assert(this.turn.turnNumber === 13, '13 cards where played')

    console.assert(this.turn.revealedCards.length === 0, 'no more revealed cards')

    console.assert(this.turn.player1.score + this.turn.player2.score === 91, 'all score cards add up to 91')
  }
}
