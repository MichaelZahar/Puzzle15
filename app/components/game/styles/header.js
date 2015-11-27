'use strict';

import React from 'react-native';

const {
  StyleSheet
} = React;

const header = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 30
  },
  timer: {
  },
  counter: {
  },
  text: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Yanone Kaffeesatz'
  }
});

export default header;
