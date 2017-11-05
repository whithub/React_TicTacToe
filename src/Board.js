import React from 'react';
import Square from './Square';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this._renderSquare = this._renderSquare.bind(this);
    this._handleClick  = this._handleClick.bind(this);
    this.state= {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  _renderSquare(i) {
    return <Square value={this.state.squares[i]}
                   onClick={() => this._handleClick(i)} />;
  }

  _handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this._renderSquare(0)}
          {this._renderSquare(1)}
          {this._renderSquare(2)}
        </div>
        <div className="board-row">
          {this._renderSquare(3)}
          {this._renderSquare(4)}
          {this._renderSquare(5)}
        </div>
        <div className="board-row">
          {this._renderSquare(6)}
          {this._renderSquare(7)}
          {this._renderSquare(8)}
        </div>
      </div>
    );
  }
};

export default Board;