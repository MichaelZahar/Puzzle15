'use strict';

import React from 'react-native';
import Cell from './Cell';
import Timer from './Timer';
import Counter from './Counter';
import headerStyles from './styles/header';
import styles from './styles/game';
import { CELL_SIZE } from '../../config';

const {
  TouchableHighlight,
  Text,
  View
} = React;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.cellsInRow = this.props.game.type;
    this.cellSize = CELL_SIZE;

    this.state = {
      complete: this.props.game.complete,
      game: this.props.game
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ game: nextProps.game });
  }

  getCell(value, index) {
    return (
      <Cell key={value} index={index} value={value} size={this.cellSize} boardSize={this.cellsInRow} onPress={this.handleClick.bind(this, value)} />
    );
  }

  handleClick(value) {
    let game = this.state.game;
    const index = game.cells.indexOf(value);
    const newIndex = this.getNewIndex(index);

    if (this.state.complete || newIndex === undefined) {
      return -1;
    }

    this.attempts = this.attempts + 1;

    game.swapCells(index, newIndex);

    if (game.complete) {
      this.setState({ complete: true });
      this.endGame();
    }

    return newIndex;
  }

  getNewIndex(index) {
    const size = this.cellsInRow;
    let empty = this.state.game.getEmptyCell();

    return [
      (index % size !== 0) ? index - 1 : undefined,
      (index % size !== size - 1) ? index + 1 : undefined,
      index - size,
      index + size
    ].filter((posibleIndex) => {
      return posibleIndex === empty;
    })[0];
  }

  get attempts() {
    return this.refs.attempts.state.value;
  }

  set attempts(value) {
    this.refs.attempts.setState({
      value: value
    });
  }

  endGame() {
    let game = this.state.game;

    game.completeAt = Date.now();

    this.setState({
      complete: true
    });

    let func = this.props.onEndGame.bind(null, this.state.game);

    window.setTimeout(func, 1000);
  }

  refreshGame() {
    this.props.onEndGame(this.state.game, 'refresh');
  }

  closeGame() {
    this.props.onEndGame(this.state.game, 'close');
  }

  render() {
    const type = this.state.game.type;
    const cells = this.state.game.cells.reduce((result, value, index) => {
      if (value) {
        result.push(this.getCell(value, index));
      }

      return result;
    }, []);

    return (
      <View style={styles.container}>
        <View style={headerStyles.container}>
          <Timer ref="timer" active={!this.state.complete} value={this.state.game.duration} text="Duration" />
          <Counter ref="attempts" text="Attempts" value={this.state.game.attempts} />
        </View>
        <View style={[styles.board, styles['board' + type]]}>
          <View style={[styles.cells, styles['board' + type]]}>{cells}</View>
        </View>
        <View style={styles.actions}>
          <TouchableHighlight
            onPress={this.refreshGame.bind(this)}
            style={[styles.button, styles.green]}
            underlayColor="grey">
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.closeGame.bind(this)}
            style={[styles.button, styles.red]}
            underlayColor="grey">
            <Text style={styles.buttonText}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  onEndGame: React.PropTypes.func.isRequired
};

export default Game;
