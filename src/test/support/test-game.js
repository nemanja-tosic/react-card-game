import { Game } from '../../models/game';
import { TestPlayer } from './test-player';
import { TestCards } from './test-cards';

export class TestGame {
  static create({players = [TestPlayer.create()], talon = [[TestCards.create()]], state = 'notStarted', winners = []}: TestGameBuilder = {}): Game {
    return new Game(players, talon, state, winners);
  }

  static createNotStarted() {
    return TestGame.create({state: 'notStarted'});
  }

  static createLoading() {
    return TestGame.create({state: 'loading'});
  }

  static createInProgress() {
    return TestGame.create({state: 'inProgress'});
  }

  static createOver() {
    return TestGame.create({state: 'over'});
  }
}
