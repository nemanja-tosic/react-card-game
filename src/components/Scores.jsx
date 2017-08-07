// @flow
import React from 'react';

import { Game } from '../models/game';
import './Scores.css';

const Scores = ({game, onNewGame}: { game: Game, onNewGame: () => void }) => (
  <div className="Scores container-fluid">
    <div className="row align-items-center justify-content-center">
      <div className="col-md-6 col-lg-4">
        {game.players.map((player, index) => (
          <div key={index} className={`Scores__score${game.winners.includes(player) ? ' Scores__score--winner' : ''}`}>
            <div className="Scores__name">
              {player.name} {game.winners.includes(player) && ' won!!!'}
            </div>
            <div className="Scores__total">{player.score}</div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={() => onNewGame()}>
          Back to the menu
        </button>
      </div>
    </div>
  </div>
);

export default Scores;
