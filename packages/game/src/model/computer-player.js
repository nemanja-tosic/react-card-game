import { Player } from './player';

export class ComputerPlayer extends Player {
  setState(state) {
    if (state === 'active') {
      setTimeout(() => {
        const randomCard = Math.floor(Math.random() * this.cards.length);
        this.playCard(randomCard);
      }, 1000); // simulate a small delay
    }

    super.setState(state);
  }
}
