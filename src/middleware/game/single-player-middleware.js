// @flow
import { createSinglePlayerGame } from 'game';

import * as actions from './actions';
import { Game } from '../../models/game';
import { Player } from '../../models/player';
import { Card } from '../../models/card';

export const singlePlayerMiddleware = (store: any) => (next: any) => {
  let game;
  let player;

  const parsePlayers = (game) => {
    return game.players.map((player, index) => {
      const {name, score, id} = player;
      const isActive = game.activePlayer === player.id;
      const isUserControlled = index === 0;
      const cards = (player.cards || []).map((card) => new Card(card.code));
      const takenCards = (player.takenCards || []).map((turn) => turn.map((card) => new Card(card.code)));

      return new Player(id, name, cards, takenCards, score, isActive, isUserControlled);
    });
  };

  const parseGame = () => {
    const {state} = game;
    const talon = Array.from(game.talon.values(), card => new Card(card.code));
    const players = parsePlayers(game);
    const winners = (game.winners || []).map(winner => players.find(player => player.id === winner.id));

    return new Game(players, talon, state, winners);
  };

  return (action: any) => {
    next(action);

    if (action.type === 'START_GAME') {
      ({game, player} = createSinglePlayerGame(action.payload.playerName, action.payload.numberOfOpponents));
      game.attach(() => {
        store.dispatch(actions.gameUpdate(parseGame()));
      });
      game.start();
    } else if (action.type === 'PLAYER_PLAY_CARD') {
      player.playCard(action.payload.cardIndex);
    }
  };
};
