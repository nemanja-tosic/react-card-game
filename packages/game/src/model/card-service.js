// @flow
import { Card } from './card';

export class CardService {
  cardValueTable: Map<string, number> = new Map([
    ['KING', 14],
    ['QUEEN', 13],
    ['JACK', 12],
    ['ACE', 1],
  ]);

  static create() {
    return new CardService();
  }

  /**
   * @returns {Promise.<string>} Returns the id of the deck to use.
   */
  generateDeck(): Promise<string> {
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
      .then(response => response.json())
      .then(response => response.deck_id);
  }

  draw(deckId: string): Promise<Array<Card>> {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`)
      .then(response => response.json())
      .then(response => response.cards.map(this._mapResponseToCardModel.bind(this)));
  }

  _mapResponseToCardModel(card: {code: string, suit: string, value: string}): Card {
    return new Card(
      card.code,
      card.suit,
      this.cardValueTable.get(card.value) || parseInt(card.value, 10)
    );
  }
}
