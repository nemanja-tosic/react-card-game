// @flow
import React from 'react';

import { Card } from '../models/card';
import CardComponent from './Card';

import './Talon.css';

const Talon = ({cards, cardRef}: { cards: Array<Card>, cardRef: any }) => (
  <div className="Talon">
    {cards.map((card, index) => (
      <div key={index} className="Talon__card">
        <CardComponent card={card} cardRef={cardRef}/>
      </div>
    ))}
  </div>
);

export default Talon;
