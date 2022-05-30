import { SequenceOfCards } from './sequenceOfCards'
import { Player } from "./player";
import { Turn, Turns } from "./turn";

/** GOPS Game -- https://playingcarddecks.com/blogs/how-to-play/gops-game-rules */
export class GopsGame {

  constructor(
    private readonly scoreCards: SequenceOfCards,
    private readonly player1: Player,
    private readonly player2: Player,
  ) {
  }

  play(): Turns {
    const firstTurn = new Turn(
      1,
      this.scoreCards,
      [],
      this.player1,
      this.player2
    )

    return GopsGame.nextTurn(new Turns([firstTurn]))
  }

  private static nextTurn(turns: Turns): Turns {
    if (turns.hasNextTurn)
      return this.nextTurn(turns.playNext())
    else
      return turns
  }
}
