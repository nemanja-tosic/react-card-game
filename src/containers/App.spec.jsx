// @flow
import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import * as actions from '../actions';
import AppContainer from './App';
import { TestGame } from '../test/support/test-game';
import GameComponent from '../components/Game';

describe('AppContainer', () => {
  let game;
  let store;

  describe('when the game has not started', () => {
    beforeEach(() => {
      game = TestGame.createNotStarted();
      store = configureStore()({
        game,
      });
    });

    it('should show the menu', () => {
      const appContainer = shallow(<AppContainer store={store}/>);

      expect(appContainer.getNode()).toMatchSnapshot();
    });

    it('should dispatch the NEW_GAME action when the onNewGame prop is called', () => {
      const playerName = 'player';
      const numberOfOpponents = 3;
      const appContainer = shallow(<AppContainer store={store}/>).dive();
      const gameComponent = appContainer.find('Menu');

      gameComponent.simulate('startGame', playerName, numberOfOpponents);

      expect(store.getActions()).toContainEqual(actions.startGame(playerName, numberOfOpponents));
    });
  });

  describe('when the game is loading', () => {
    beforeEach(() => {
      game = TestGame.createLoading();
      store = configureStore()({
        game,
      });
    });

    it('should show the loading screen', () => {
      const appContainer = shallow(<AppContainer store={store}/>);

      expect(appContainer.getNode()).toMatchSnapshot();
    });
  });

  describe('when the game is inProgress', () => {
    beforeEach(() => {
       game = TestGame.createInProgress();
       store = configureStore()({
        game,
      });
    });

    it('should show the game', () => {
      const appContainer = shallow(<AppContainer store={store}/>);

      expect(appContainer.getNode()).toMatchSnapshot();
    });

    it('should dispatch the card clicked action when the onCardClicked prop is called', () => {
      const appContainer = shallow(<AppContainer store={store}/>).dive();
      const gameComponent = appContainer.find('GameComponent');
      const cardIndex = 1;

      gameComponent.simulate('cardClicked', cardIndex);

      expect(store.getActions()).toContainEqual(actions.playCard(cardIndex));
    });
  });

  describe('when the game is over', () => {
    beforeEach(() => {
      game = TestGame.createOver();
      store = configureStore()({
        game,
      });
    });

    it('should show the scoreboard', () => {
      const appContainer = shallow(<AppContainer store={store}/>);

      expect(appContainer.getNode()).toMatchSnapshot();
    });

    it('should dispatch the NEW_GAME action when the onNewGame prop is called', () => {
      const appContainer = shallow(<AppContainer store={store}/>).dive();
      const gameComponent = appContainer.find('Scores');

      gameComponent.simulate('newGame');

      expect(store.getActions()).toContainEqual(actions.newGame());
    });
  });
});
