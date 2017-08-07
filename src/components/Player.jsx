// @flow
import React from 'react';

import { Player } from '../models/player';
import CardComponent from './Card';

import './Player.css';

type PlayerComponentProps = {
  player: Player,
  slot: number,
  onCardClicked: (index: number) => void,
  cardRef: any,
};

const PlayerComponent = ({player, slot, onCardClicked, cardRef}: PlayerComponentProps) => {
  const cardOrientation = slot % 2 === 0 ? 'portrait' : 'landscape';

  return (
    <div className={`Player Player--${slot}`}>
      <div className="Player__info">
        <div className={`Player__avatar Player__avatar--${slot}`}/>
        <div className={`Player__name Player__name--${player.isActive ? 'active' : 'inactive'}`}>
          {player.name}
        </div>
        <div className="Player__taken-cards">
          {player.takenCards.map((turn, groupIndex) => (
            <div key={groupIndex} className="Player__taken-cards-group">
              {turn.map((card, cardIndex) => (
                <CardComponent
                  key={cardIndex}
                  faceDown
                  card={card}
                  orientation={cardOrientation}
                  cardRef={cardRef}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='Player__hand'>
        {player.cards.map((card, index) => (
          <div key={index} className='Player__hand__card'>
            <CardComponent
              cardRef={cardRef}
              onClick={() => player.isUserControlled && player.isActive ? onCardClicked(index) : undefined}
              faceDown={!player.isUserControlled}
              card={card}
              orientation={cardOrientation}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerComponent;
