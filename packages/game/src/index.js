import { Player } from './model/player';
import { Game } from './model/game';
import { CardService } from './model/card-service';
import { ComputerPlayer } from './model/computer-player';

const range = (start: number, end: number) => {
  return Array.from({length: (end - start + 1)}, (v, k) => k + start);
};

export const createSinglePlayerGame = (playerName, numberOfOpponents) => {
  const game = new Game(CardService.create());

  const player = new Player(0, playerName, game);
  const ai = range(1, numberOfOpponents).map((index) => {
    return new ComputerPlayer(index, `Computer ${index}`, game);
  });

  game.players = [player, ...ai];

  return {player, game};
};
