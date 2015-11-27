'use strict';

import React from 'react-native';
import MainMenu from './components/mainMenu/MainMenu';
import Game from './components/game/Game';
import Result from './components/result/Result';
import UserGame from './components/game/UserGame';

const {
  AsyncStorage,
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View
} = React;
const STORAGE_KEY = '@Puzzle15:game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  message: {
    marginTop: 15
  },
  text: {
    fontSize: 9,
    lineHeight: 16,
    textAlign: 'center'
  }
});

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading game…',
      init: true,
      game: undefined
    };

    this._onGameChange = this._onGameChange.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.handleResultClose = this.handleResultClose.bind(this);
  }

  componentDidMount() {
    this._loadGame().done();
  }

  async _loadGame() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const gameData = JSON.parse(data);

      if (gameData && gameData.type) {
        this.setState({ init: false, game: this.createGame(gameData), message: '' });
      } else {
        this.setState({ init: false, game: null, message: 'Game not found' });
      }
    } catch (err) {
      this._appendMessage('Async storage error: ' + err.message);
    }
  }

  async _onGameChange(data) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  }

  createGame(data) {
    return new UserGame(data, this._onGameChange);
  }

  getGameState() {
    if (this.state.init) {
      return (
        <View>
          <ActivityIndicatorIOS style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 40}} />
        </View>
      );
    }

    let game = this.state.game;
    let gameInProgress;

    if (game) {
      gameInProgress = game && !game.complete;

      if (gameInProgress) {
        return (
          <Game onEndGame={this.handleEndGame} game={game} />
        );
      }

      return (
        <Result onClose={this.handleResultClose} attempts={game.attempts} duration={game.duration} />
      );
    }

    return (
      <MainMenu onStartGame={this.handleStartGame} />
    );
  }

  handleStartGame(type) {
    let game = this.createGame({ type: type });

    this.setState({ game: game, message: 'Let\'s play!' });
  }

  handleEndGame(game, reason) {
    switch (reason) {
    case 'close':
      AsyncStorage.removeItem(STORAGE_KEY, () => {
        this.setState({ game: undefined });
      });
      break;
    case 'refresh':
      AsyncStorage.removeItem(STORAGE_KEY, () => {
        this.setState({ game: this.createGame({ type: game.type }) });
      });
      break;
    default:
      this.setState({ game: game });
    }
  }

  handleResultClose() {
    AsyncStorage.removeItem(STORAGE_KEY, (error) => {
      if (error) {
        this._appendMessage('AsyncStorage error: ' + error.message);
        return;
      }

      this.setState({ game: undefined });
    });
  }

  _appendMessage(message) {
    this.setState({ messages: message });
  }

  render() {
    const widgets = this.getGameState();

    return (
      <View style={styles.container}>
        <View style={styles.message}><Text style={styles.text}>{this.state.message}</Text></View>
        {widgets}
      </View>
    );
  }
}
