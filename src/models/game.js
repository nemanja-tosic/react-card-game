// @flow
import { Card } from './card';
import { Player } from './player';

type GameState = 'notStarted' | 'loading' | 'inProgress' | 'over';

export class Game {
  players: Array<Player>;
  talon: Array<Card>;
  state: GameState;
  winners: Array<Player>;

  constructor(players: Array<Player>, talon: Array<Card>, state: GameState, winners: Array<Player>) {
    this.players = players;
    this.talon = talon;
    this.state = state;
    this.winners = winners;
  }
}
