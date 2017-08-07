// @flow
import { expect } from 'chai';

import { TestCards } from '../../test/support/test-cards';
import { Card } from './card';

describe('Card', () => {
  let card: Card;

  beforeEach(() => {
    card = TestCards.create({value: 5});
  });

  describe('#takes(card)', () => {
    describe('when the given card has a lower value than the current card', () => {
      it('should return true', () => {
        const lowerValueCard = TestCards.create({value: 4});

        expect(card.takes(lowerValueCard)).to.equal(true);
      });
    });

    describe('when the given card has the same value as the current card', () => {
      it('should return true', () => {
        const sameValueCard = TestCards.create({value: 5});

        expect(card.takes(sameValueCard)).to.equal(true);
      });
    });

    describe('when the given card has a higher value than the current card', () => {
      it('should return false', () => {
        const higherValueCard = TestCards.create({value: 6});

        expect(card.takes(higherValueCard)).to.equal(false);
      });
    });
  });
});
