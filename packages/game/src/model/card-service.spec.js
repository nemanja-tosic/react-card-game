// @flow
import { expect } from 'chai';
import * as sinon from 'sinon';

import { CardService } from './card-service';
import { Card } from './card';

describe('CardService', () => {
  let fetchStub;
  let cardService: CardService;

  const generateResponse = (response) => {
    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  }

  beforeEach(() => {
    fetchStub = sinon.stub();
    global.fetch = fetchStub;

    cardService = new CardService();
  });

  describe('#generateDeck()', () => {
    it('should send a request to deckofcards to generate a new deck and return its id', () => {
      const expectedDeckId = 'abc';
      fetchStub.returns(generateResponse({deck_id: expectedDeckId}));

      return cardService
        .generateDeck()
        .then((deckId) => {
          expect(fetchStub).to.have.been.calledWith('https://deckofcardsapi.com/api/deck/new/shuffle/');
          expect(deckId).to.equal(expectedDeckId);
        });
    });
  });

  describe('#draw(deckId)', () => {
    let deckId = 'abc';
    const response = generateResponse({
      success: true,
      cards: [
        {
          value: 'KING',
          suit: 'HEARTS',
          code: 'KH'
        },
        {
          value: 'QUEEN',
          suit: 'HEARTS',
          code: 'QH'
        },
        {
          value: 'JACK',
          suit: 'HEARTS',
          code: 'JH'
        },
        {
          value: 'ACE',
          suit: 'HEARTS',
          code: 'AH'
        },
        {
          value: '8',
          suit: 'CLUBS',
          code: '8C'
        }
      ],
      deck_id: '3p40paa87x90',
      remaining: 50
    });

    it('should draw 10 cards from the provided deck', () => {
      fetchStub.returns(response);

      return cardService
        .draw(deckId)
        .then(() => {
          expect(fetchStub).to.have.been.calledWith(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`);
        });
    });

    describe('card to value mapping', () => {
      beforeEach(() => {
        fetchStub.returns(response);
      });

      it('should convert the value "KING" to 14', () => {
        return cardService
          .draw(deckId)
          .then((cards) => {
            expect(cards).to.deep.include(new Card('KH', 'HEARTS', 14));
          });
      });

      it('should convert the value "QUEEN" to 13', () => {
        return cardService
          .draw(deckId)
          .then((cards) => {
            expect(cards).to.deep.include(new Card('QH', 'HEARTS', 13));
          });
      });

      it('should convert the value "JACK" to 12', () => {
        return cardService
          .draw(deckId)
          .then((cards) => {
            expect(cards).to.deep.include(new Card('JH', 'HEARTS', 12));
          });
      });

      it('should convert the value "ACE" to 1', () => {
        return cardService
          .draw(deckId)
          .then((cards) => {
            expect(cards).to.deep.include(new Card('AH', 'HEARTS', 1));
          });
      });

      it('should convert all numeric card values to integers', () => {
        return cardService
          .draw(deckId)
          .then((cards) => {
            expect(cards).to.deep.include(new Card('8C', 'CLUBS', 8));
          });
      });
    });
  });
});
