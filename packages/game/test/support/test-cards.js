// @flow
import { Card } from '../../src/model/card';

type TestCardsBuilder = {
  code?: string,
  suit?: string,
  value?: number,
};

export class TestCards {
  static create({code = 'KS', suit = 'SPADES', value = 14}: TestCardsBuilder = {}): Card {
    return new Card(code, suit, value);
  }

  static createHand(): Array<Card> {
    return [
      TestCards.create({code: '10', value: 10}),
      TestCards.create({code: 'A', value: 1}),
      TestCards.create({code: 'J', value: 12}),
      TestCards.create({code: 'Q', value: 13}),
      TestCards.create({code: 'K', value: 14}),
    ];
  }
}
