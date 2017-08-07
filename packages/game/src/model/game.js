// @flow
import { Player } from './player';
import { Card } from './card';
import { CardService } from './card-service';

type Observer = () => void;

export class Game {
  players: Array<Player>;
  winners: ?Array<Player> = null;
  talon: Map<Player, Card> = new Map();
  activePlayer = 0;
  state: 'notStarted' | 'loading' | 'inProgress' | 'over' = 'notStarted';

  cardService: CardService;
  _observers: Array<Observer> = [];

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  async start(): Promise<void> {
    this.talon = new Map();

    this.state = 'loading';
    this._onUpdate();

    const deck = await this.cardService.generateDeck();
    for (const player of this.players) {
      player.cards = await this.cardService.draw(deck);
    }

    this.players[0].setState('active');
    this.state = 'inProgress';
    this._onUpdate();
  }

  addCardToTalon(player: Player, card: Card) {
    this.talon.set(player, card);
    this._activateNextPlayer();
    this._onUpdate();

    const isTurnDone = this.players.length === this.talon.size;
    if (isTurnDone) {
      this._updateScore();

      const isGameOver = this.players.every(player => player.hasPlayedAllCards());
      if (isGameOver) {
        this._calculateWinners();
      }

      // the update is delayed when the turn is done in order to let the player view the talon
      setTimeout(() => {
        this._onUpdate();
      }, 1000);
    }
  }

  attach(observer: Observer): void {
    this._observers.push(observer);
  }

  _onUpdate(): void {
    this._observers.forEach(observer => {
      observer();
    });
  }

  _activateNextPlayer(): void {
    this.players[this.activePlayer].setState('inactive');

    this.activePlayer = (this.activePlayer + 1) % this.players.length;
    this.players[this.activePlayer].setState('active');
  }

  _updateScore(): void {
    const playedCards = Array.from(this.talon.values());
    const highestCard = playedCards
      .reduce((highCard, card) => card.takes(highCard) ? card : highCard, playedCards[0]);
    const winner = Array
      .from(this.talon.keys())
      .reverse()
      .find(player => this.talon.get(player) === highestCard);

    (winner: any).takeCards(playedCards);
    this.talon.clear();
  }

  _calculateWinners(): void {
    const highScore = this.players.reduce((highScore, player) => {
      return player.score > highScore ? player.score : highScore;
    }, 0);

    this.winners = this.players.filter(player => player.score === highScore);
    this.state = 'over';
  }
}
