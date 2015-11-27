import React from 'react-native';
import styles from './styles/header';

const {
  Text,
  View
} = React;

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    return (
      <View style={styles.counter}><Text style={styles.text}>{this.props.text}: {this.state.value}</Text></View>
    );
  }
}

Counter.propTypes = {
  value: React.PropTypes.number,
  text: React.PropTypes.string
};

Counter.defaultProps = {
  text: 'Counter',
  value: 0
};

export default Counter;
