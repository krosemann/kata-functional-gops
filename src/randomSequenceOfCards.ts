import { Card, SequenceOfCards } from "./sequenceOfCards";

// Shamelessly stolen from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function randomSequenceOfCards(setOfCards: Card[]): SequenceOfCards {
  let currentIndex = setOfCards.length;
  const cards = [...setOfCards]

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex] as Card, cards[currentIndex] as Card];
  }

  return new SequenceOfCards(cards);
}
