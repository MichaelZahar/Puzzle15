'use strict';

import React from 'react-native';
import styles from './styles/cell';

const {
  Animated,
  Text,
  View,
  TouchableHighlight
} = React;

class Cell extends React.Component {
  constructor(props) {
    super(props);

    const index = this.props.index;
    const offset = this._getPosition(index);

    this.state = {
      index: this.props.index,
      top: new Animated.Value(offset.top),
      left: new Animated.Value(offset.left)
    };
  }

  componentWillReceiveProps(nextProps) {
    this._oldIndex = this.state.index;
    this.setState({
      index: nextProps.index
    });
  }

  _getPosition(index): number {
    const size = this.props.size;
    const boardSize = this.props.boardSize;

    return {
      top: Math.floor(index / boardSize) * size,
      left: index % boardSize * size
    };
  }

  calculateOffset(index) {
    let offset = {
      top: this.state.top,
      left: this.state.left
    };

    if (this._oldIndex !== undefined) {
      const newOffset = this._getPosition(index);

      Animated.parallel([
        Animated.timing(
          offset.top,
          {
            diration: 100,
            toValue: newOffset.top
          }
        ),
        Animated.timing(
          offset.left,
          {
            diration: 100,
            toValue: newOffset.left
          }
        ),
      ]).start();
    }

    return offset;
  }

  onPress() {
    this._oldIndex = this.state.index;

    const newIndex = this.props.onPress(this.state.index);

    if (newIndex !== -1) {
      this.setState({
        index: newIndex
      });
    }
  }

  render() {
    const value = this.props.value;
    const placed = this.props.value === this.state.index + 1;
    const cellStyle = this.calculateOffset(this.state.index);

    let cellStyles = [styles.cell, cellStyle];

    if (placed) {
      cellStyles.push(styles.placed);
    }

    return (
      <Animated.View style={[cellStyles]}>
        <TouchableHighlight onPress={this.onPress.bind(this)} style={[styles.button, placed && styles.placed]}>
          <View style={styles.label}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

Cell.propTypes = {
  index: React.PropTypes.number,
  value: React.PropTypes.number,
  size: React.PropTypes.number,
  boardSize: React.PropTypes.number,
  onPress: React.PropTypes.func.isRequired
};

export default Cell;
