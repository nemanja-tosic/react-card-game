// @flow
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/index';

import { Game } from '../models/game';

import Menu from '../components/Menu';
import Loading from '../components/Loading';
import GameComponent from '../components/Game';
import Scores from '../components/Scores';

import './App.css';

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
  handleCardClicked: (index) => dispatch(actions.playCard(index)),
  handleStartGame: (playerName, opponents) => dispatch(actions.startGame(playerName, opponents)),
  handleNewGame: () => dispatch(actions.newGame()),
});

type AppProps = {
  game: Game,
  handleStartGame: () => void,
  handleCardClicked: () => void,
  handleNewGame: () => void,
};

const App = ({game, handleStartGame, handleCardClicked, handleNewGame}: AppProps) => (
  <div className="App">
    {game.state === 'notStarted' && <Menu onStartGame={handleStartGame}/>}
    {game.state === 'loading' && <Loading message="Starting game..." />}
    {game.state === 'inProgress' && <GameComponent game={game} onCardClicked={handleCardClicked}/>}
    {game.state === 'over' && <Scores game={game} onNewGame={handleNewGame}/>}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
