import { Player } from '../../models/player';
import { TestCards } from './test-cards';

export class TestPlayer {
  static create({id = 1, name = 'Player', cards = TestCards.createHand(), takenCards = [], score = 0, isActive = true, isUserControlled = true} = {}): Player {
    return new Player(id, name, cards, takenCards, score, isActive, isUserControlled);
  }
}
