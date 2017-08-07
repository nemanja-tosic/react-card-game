// @flow
import { Card } from './card';

export class Player {
  id: number;
  name: string;
  cards: Array<Card> = [];
  score: number = 0;
  isActive = false;
  takenCards: Array<Array<Card>> = [];
  isUserControlled: boolean;

  constructor(id: number, name: string, cards: Array<Card>, takenCards: Array<Array<Card>>, score: number, isActive: boolean, isUserControlled: boolean) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.takenCards = takenCards;
    this.score = score;
    this.isActive = isActive;
    this.isUserControlled = isUserControlled;
  }
}
