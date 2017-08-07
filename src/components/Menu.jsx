// @flow
import React from 'react';

import './Menu.css';

/**
 * The end number is inclusive.
 */
const range = (start: number, end: number) => {
  return Array.from({length: (end - start + 1)}, (v, k) => k + start);
};

class Menu extends React.Component {
  state = {
    playerName: '',
    numberOfOpponents: 1,
  }

  props: {
    onStartGame: (playerName: string, numberOfOpponents: number) => void,
  }

  constructor(props: any) {
    super(props);

    (this: any).handleChangeName = this.handleChangeName.bind(this);
    (this: any).handleChangeOpponent = this.handleChangeOpponent.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event: Event & { currentTarget: HTMLInputElement }): void {
    const input = event.currentTarget;
    const inputInvalidMessage = 'The name must not start with a whitespace';

    input.setCustomValidity(input.validity.patternMismatch ? inputInvalidMessage : '');
    this.setState({playerName: input.value});
  }

  handleChangeOpponent(event: Event & { currentTarget: HTMLInputElement }): void {
    this.setState({numberOfOpponents: parseInt(event.currentTarget.value, 10)});
  }

  handleSubmit(event: Event): void {
    this.props.onStartGame(this.state.playerName, this.state.numberOfOpponents);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Menu container-fluid">
        <div className="row justify-content-center align-items-center">
          <form className="col-sm-6" onSubmit={this.handleSubmit}>
            <div className="form-group Menu__name">
              <input
                maxLength="20"
                pattern="\S.*"
                onChange={this.handleChangeName}
                className="form-control"
                placeholder="Your name"
                required/>
            </div>
            <div className="form-group Menu__number-of-opponents">
              <select className="form-control" onChange={this.handleChangeOpponent}>
                {range(1, 3).map(player => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Start game</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Menu;
