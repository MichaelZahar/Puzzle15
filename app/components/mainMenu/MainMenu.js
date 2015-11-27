'use strict';

import React from 'react-native';
import styles from './styles/mainMenu';

const {
  Text,
  View,
  TouchableHighlight
} = React;

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { types: [3, 4] };
  }

  getGameTypeButton(type, index) {
    return (
      <TouchableHighlight
        key={index}
        onPress={this.startGame.bind(this, type)}
        style={styles.button}
        underlayColor="grey">
        <Text style={styles.buttonText}>{type}&times;{type}</Text>
      </TouchableHighlight>
    );
  }

  startGame(type) {
    this.props.onStartGame(type);
  }

  render() {
    const actions = this.state.types.map((type, index) => {
      return this.getGameTypeButton(type, index);
    });

    return (
      <View style={styles.container}>
        <Text style={styles.header}>15 Puzzle</Text>
        <Text style={styles.text}>Choose the game</Text>
        <View style={styles.actions}>
          {actions}
        </View>
      </View>
    );
  }
}

MainMenu.propTypes = {
  onStartGame: React.PropTypes.func.isRequired
};

export default MainMenu;
