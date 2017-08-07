// @flow
import { Card } from './card';
import { Game } from './game';

type PlayerState = 'inactive' | 'active';

export class Player {
  id: number;
  score: number = 0;
  cards: Array<Card>;
  game: Game;
  name: string;
  state: PlayerState = 'inactive';
  /**
   * Every card in a specific turn
   * @type {Array}
   */
  takenCards: Array<Array<Card>> = [];

  constructor(id: number, name: string, game: Game) {
    this.id = id;
    this.name = name;
    this.game = game;
  }

  setState(state: PlayerState): void {
    this.state = state;
  }

  hasPlayedAllCards(): boolean {
    return this.cards.length === 0;
  }

  takeCards(cards: Array<Card>): void {
    this.score += cards.reduce((total, card) => total + card.value, 0);
    this.takenCards = [...this.takenCards, cards];
  }

  playCard(cardIndex: number): void {
    if (this.state === 'inactive') {
      throw new Error('An inactive player cannot play');
    }

    this.game.addCardToTalon((this: Player), this.cards.splice(cardIndex, 1)[0]);
  }
}
