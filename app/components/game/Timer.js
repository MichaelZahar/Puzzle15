import React from 'react-native';
import styles from './styles/header';

const {
  Text,
  View
} = React;

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const startTime = Date.now();

    this.state = {
      active: props.active,
      startTime: startTime,
      value: toHHMMSS(this.props.value * 1000 + Date.now() - startTime, ' ', ['s', 'm', 'h'])
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    if (this.state.active) {
      this._start();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ startTime: Date.now() });
    nextProps.active ? this._start() : this._stop();
  }

  componentWillUnmount() {
    this._stop();
  }

  update() {
    this.setState({
      value: toHHMMSS(this.props.value * 1000 + Date.now() - this.state.startTime, ' ', ['s', 'm', 'h'])
    });
  }

  _stop() {
    window.clearInterval(this.intervalId);
  }

  _start() {
    this.intervalId = window.setInterval(this.update, 1000);
  }

  render() {
    return (
      <View style={styles.timer}>
        <Text style={styles.text}>{this.props.text}: {this.state.value}</Text>
      </View>
    );
  }
}

Timer.propTypes = {
  active: React.PropTypes.bool,
  value: React.PropTypes.number,
  text: React.PropTypes.string
};

Timer.defaultProps = {
  active: true,
  value: 0,
  text: 'Duration'
};

export default Timer;

function fixValue(value, string) {
  if (value < 10) {
    return '0' + value + (string || '');
  }

  return value.toString() + (string || '');
}

function toHHMMSS(duration, devider, values = []) {
  let parts = [];
  let hh = Math.floor(duration / 1000 / 60 / 60);
  let mm = Math.floor(duration / 1000 / 60) % 60;
  let ss = Math.floor(duration / 1000) % 60;

  if (hh) {
    parts.push(fixValue(hh, values[2]));
  }

  if (hh || mm) {
    mm = hh ? fixValue(mm, values[1]) : mm + (values[1] || '');
    parts.push(mm);
  }

  ss = (hh || mm) ? fixValue(ss, values[0]) : ss + (values[0] || '');

  parts.push(ss);

  return parts.join(devider || ':');
}
