// @flow
export class Card {
  code: string;
  suit: string;
  value: number;

  constructor(code: string, suit: string, value: number) {
    this.code = code;
    this.suit = suit;
    this.value = value;
  }

  takes(card: Card) {
    return this.value >= card.value;
  }
}
