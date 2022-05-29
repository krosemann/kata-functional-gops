import { Turn } from "./turn";

export function outputTurns(turns: Turn[]) {
  turns.forEach(it => outputTurn(it))

  const lastTurn = turns[turns.length - 1]

  if ((lastTurn?.result.player1Score ?? 0) > (lastTurn?.result.player2Score ?? 0)) {
    console.log('Player 1 wins!')
  } else {
    console.log('Player 2 wins!')
  } // there is no tie with 91 total points
}

function outputTurn(turn: Turn) {
  console.log(`Turn ${turn.turnNumber} with bounty:`, turn.currentCard)
  console.log(`With cards carried over from previous turns:`, turn.revealedCards)
  console.log('Player\'s bet:', turn.player1.nextCard(), 'vs', turn.player2.nextCard())
  console.log(`Scores: ${(turn.result.player1Score)} vs ${(turn.result.player2Score)}`)
  console.log()
}
