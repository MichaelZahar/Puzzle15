'use strict';

import React from 'react-native';
import { CELL_SIZE } from '../../../config';

const {
  StyleSheet
} = React;

const game = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  board: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },

  board3: {
    width: CELL_SIZE * 3,
    height: CELL_SIZE * 3
  },

  board4: {
    width: CELL_SIZE * 4,
    height: CELL_SIZE * 4
  },

  cells: {
    alignSelf: 'center'
  },

  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },

  button: {
    borderRadius: 4,
    borderWidth: 0,
    padding: 10,
    margin: 5,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2
  },

  buttonText: {
    fontFamily: 'Yanone Kaffeesatz'
  }
});

export default game;
