import { GopsGame } from './gops'
import { Card } from "./sequenceOfCards";
import { Player } from "./player";
import { randomSequenceOfCards } from "./randomSequenceOfCards";
import { outputTurns } from "./consoleOutput";
import { Turn } from "./turn";

const setOfCards: Card[] = [
  new Card('A', 1),
  new Card('2', 2),
  new Card('3', 3),
  new Card('4', 4),
  new Card('5', 5),
  new Card('6', 6),
  new Card('7', 7),
  new Card('8', 8),
  new Card('9', 9),
  new Card('10', 10),
  new Card('J', 11),
  new Card('Q', 12),
  new Card('K', 13)
]

const dealerSequence = randomSequenceOfCards(setOfCards)
const randomPlayerSequence = randomSequenceOfCards(setOfCards)

// Play
const playedTurns = new GopsGame(
  dealerSequence,
  new Player(randomPlayerSequence),
  new Player(dealerSequence)
).play()

// Print
outputTurns(playedTurns)

// Assert valid end
assertValidEndOfGame(playedTurns.lastPlayedTurn)

function assertValidEndOfGame(lastTurn: Turn) {
  console.assert(lastTurn.turnNumber === 13, '13 cards where played')

  console.assert(lastTurn.previouslyRevealedCards.length === 0, 'no more revealed cards')

  console.assert(lastTurn.result.player1Score + lastTurn.result.player2Score === 91, 'all score cards add up to 91')
}
