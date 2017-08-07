// @flow
import React from 'react';

import { Card } from '../models/card';

import './Card.css';

import faceDownPortraitCard from './assets/facedown-portrait.png';
import faceDownLandscapeCard from './assets/facedown-landscape.png';

type CardComponentProps = {
  card: Card,
  orientation?: 'portrait' | 'landscape',
  faceDown?: boolean,
  cardRef: (card: Card, ref: any) => void,
  onClick?: () => void,
};

const CardComponent = ({card, orientation = 'portrait', faceDown, cardRef, onClick}: CardComponentProps) => {
  let backgroundImage;
  if (faceDown) {
    backgroundImage = orientation === 'portrait'
      ? faceDownPortraitCard
      : faceDownLandscapeCard;
  } else {
    backgroundImage = card.imageUrl;
  }

  return (
    <div className="Card" ref={ref => cardRef(card, ref)} onClick={() => onClick && onClick()}>
      <div className={`Card__container Card__container--${orientation}`}>
        <div className="Card__image" style={{backgroundImage: `url(${backgroundImage})`}}/>
      </div>
    </div>
  );
};

export default CardComponent;
