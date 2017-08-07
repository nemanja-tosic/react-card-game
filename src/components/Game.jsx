// @flow
import React from 'react';

import { Game } from '../models/game';
import { Player } from '../models/player';
import { Card } from '../models/card';

import TalonComponent from './Talon';
import PlayerComponent from './Player';

import './Game.css';

class GameComponent extends React.Component {
  props: {
    game: Game,
    onCardClicked: (index: number) => void,
  };

  cardRefs = new Map();
  boundingBoxCache = new Map();

  componentWillReceiveProps() {
    for (const [cardCode, cardDomNode] of this.cardRefs.entries()) {
      this.boundingBoxCache.set(cardCode, cardDomNode.getBoundingClientRect());
    }
  }

  componentDidUpdate() {
    for (const [cardCode, cardDomNode] of this.cardRefs.entries()) {
      const first = this.boundingBoxCache.get(cardCode);
      const last = cardDomNode.getBoundingClientRect();

      const invertX = (first: any).left - last.left;
      const invertY = (first: any).top - last.top;
      // support 0 width elements
      const scaleX = (first: any).width / (last.width || 0.1);
      const scaleY = (first: any).height / (last.height || 0.1);

      cardDomNode.animate({
        transform: [
          `translate(${invertX}px, ${invertY}px) scale(${scaleX}, ${scaleY})`,
          'translate(0, 0) scale(1, 1)',
        ]
      }, {
        duration: 300,
        easing: 'ease',
      });
    }
  }

  updateCardRef(card: Card, ref: any) {
    this.cardRefs.set(card.code, ref);
  }

  render() {
    return (
      <div className="Game">
        <div className="Game__talon">
          <TalonComponent
            cards={this.props.game.talon}
            cardRef={(card, ref) => this.updateCardRef(card, ref)}
          />
        </div>
        {this.props.game.players.map((player: Player, index: number) => {
          let slot;
          if (this.props.game.players.length > 2) {
            slot = index;
          } else {
            slot = index === 1 ? 2 : 0;
          }

          return (
            <div key={player.id} className={`Game__player Game__player--${slot}`}>
              <PlayerComponent
                player={player}
                slot={slot}
                onCardClicked={this.props.onCardClicked}
                cardRef={(card, ref) => this.updateCardRef(card, ref)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default GameComponent;
