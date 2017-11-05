import React from 'react';
import Board from './Board';
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this._newGame = this._newGame.bind(this);
    this._handleClick = this._handleClick.bind(this);
    // this._calculateWinner = this._calculateWinner.bind(this);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true
    };
  }

  _handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this._calculateWinner(squares) || squares[i]) { return; }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  _calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  _newGame() {
    this.setState({
      history: [{ squares: Array(9).fill(null) }]
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner  = this._calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "We have a winner! Player: " + winner;
    } else if (history.length === 10) {
      status = "No winner this time. Try again!";
      setTimeout(this._newGame, 2000);
    } else {
      status = "Your Turn: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this._handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
           <button onClick={this._newGame}>New Game</button>
        </div>
      </div>
    );
  }
};

export default Game;