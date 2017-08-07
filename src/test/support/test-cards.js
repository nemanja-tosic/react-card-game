import { Card } from '../../models/card';

export class TestCards {
  static create({code = 'JS'} = {}): Card {
    return new Card(code);
  }

  static createHand(): Array<Card> {
    return [
      TestCards.create({code: '0C'}),
      TestCards.create({code: '2C'}),
      TestCards.create({code: '3C'}),
      TestCards.create({code: '4C'}),
      TestCards.create({code: '5C'}),
    ];
  }
}
