import { Turn, Turns } from "./turn";

export function outputTurns(turns: Turns) {
  turns.all.forEach(it => outputTurn(it))
  outputFinalOutcome(turns.lastPlayedTurn)
}

function outputTurn(turn: Turn) {
  console.log(`Turn ${turn.turnNumber} with bounty:`, turn.currentCard)
  console.log(`With cards carried over from previous turns:`, turn.revealedCards)
  console.log('Player\'s bet:', turn.player1.currentCard, 'vs', turn.player2.currentCard)
  console.log(`Scores: ${(turn.result.player1Score)} vs ${(turn.result.player2Score)}`)
  console.log()
}

function outputFinalOutcome(finalTurn: Turn) {
  if (finalTurn.result.player1Score > finalTurn.result.player2Score) {
    console.log('Player 1 wins!')
  } else {
    console.log('Player 2 wins!')
  } // there is no tie with 91 total points
}
