// @flow
import React from 'react';
import { shallow } from 'enzyme';

import PlayerComponent from './Player';
import { TestPlayer } from '../test/support/test-player';
import { TestCards } from '../test/support/test-cards';

describe('PlayerComponent', () => {
  let component;
  let cardClickedSpy;
  let cardRefSpy;
  let player;


  beforeEach(() => {
    player = TestPlayer.create({
      id: 1,
      name: 'John',
      cards: TestCards.createHand(),
      takenCards: [],
      score: 0,
      isActive: true,
      isUserControlled: true,
    });
    cardClickedSpy = jest.fn();
    cardRefSpy = jest.fn();

    component = shallow(
      <PlayerComponent
        player={player}
        slot={0}
        cardRef={cardRefSpy}
        onCardClicked={cardClickedSpy}
      />
    );
  });

  it('should be marked as active when active', () => {
    player.isActive = true;

    component.setProps({player})

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should be marked as inactive when inactive', () => {
    player.isActive = false;

    component.setProps({player})

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should have the cards in the portrait orientation when slot is 0', () => {
    component.setProps({slot: 0});

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should have the cards in the landscape orientation when slot is 1', () => {
    component.setProps({slot: 1});

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should have the cards in the portrait orientation when slot is 2', () => {
    component.setProps({slot: 2});

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should have the cards in the landscape orientation when slot is 3', () => {
    component.setProps({slot: 3});

    expect(component.getNode()).toMatchSnapshot();
  });

  it('should display all the taken cards', () => {
    player.takenCards = [[TestCards.create()]];

    component.setProps({player});

    expect(component.getNode()).toMatchSnapshot();
  });

  describe('when a card is clicked', () => {
    let card;

    beforeEach(() => {
      card = component.find('.Player__hand CardComponent').at(1);
    });

    it('should call the onCardClicked prop with the cards index', () => {
      card.simulate('click');

      expect(cardClickedSpy).toHaveBeenCalledWith(1);
    });

    it('should not call the onCardClicked prop if the player is not user controlled', () => {
      player.isUserControlled = false;
      component.setProps({player});

      card.simulate('click');

      expect(cardClickedSpy).not.toHaveBeenCalled();
    });

    it('should not call the onCardClicked prop if the player is not active', () => {
      player.isActive = false;
      component.setProps({player});

      card.simulate('click');

      expect(cardClickedSpy).not.toHaveBeenCalled();
    });
  });
});
