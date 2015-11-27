'use strict';

import React from 'react-native';
import styles from './styles/result';

const {
  Text,
  View,
  TouchableHighlight
} = React;

class Result extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>You win!</Text>
        <Text style={styles.h2}>Results:</Text>
        <Text style={styles.p}>
          Duration: {this.props.duration}s.{'\n'}
          Attempts: {this.props.attempts}
        </Text>
        <TouchableHighlight onPress={this.props.onClose} style={styles.button}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Result.propTypes = {
  duration: React.PropTypes.number,
  attempts: React.PropTypes.number,
  onClose: React.PropTypes.func.isRequired
};

export default Result;
