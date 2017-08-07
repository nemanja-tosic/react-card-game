// @flow

export class Card {
  code: string;
  imageUrl: string;

  constructor(code: string) {
    this.code = code;
    this.imageUrl = `https://deckofcardsapi.com/static/img/${code}.png`;
  }
}
