import { Card, SequenceOfCards } from "./sequenceOfCards";

export function randomSequenceOfCards(cards: Card[]): SequenceOfCards {
  let currentIndex = cards.length;
  const result = [...cards]

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [result[randomIndex] as Card, result[currentIndex] as Card];
  }

  return new SequenceOfCards(result);
}