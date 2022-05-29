import { SequenceOfCards } from './sequenceOfCards'
import { Player } from "./player";
import { Turn } from "./turn";

/** GOPS Game -- https://playingcarddecks.com/blogs/how-to-play/gops-game-rules */
export class GopsGame {

  private readonly firstTurn: Turn

  constructor(
    scoreCards: SequenceOfCards,
    player1: Player,
    player2: Player,
  ) {
    this.firstTurn = new Turn(
      1,
      scoreCards,
      [],
      player1,
      player2
    )
  }

  play(): Turn[] {
    return this.nextTurn([this.firstTurn])
  }

  private nextTurn(turns: Turn[]): Turn[] {
    const lastTurn = turns[turns.length - 1]
    if(lastTurn?.hasNextTurn)
      return this.nextTurn([...turns, lastTurn.nextTurn()])
    else
      return turns
  }
}
