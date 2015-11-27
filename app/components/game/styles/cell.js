'use strict';

import React from 'react-native';
import { CELL_SIZE } from '../../../config';

const {
  StyleSheet
} = React;
const LABEL_SIZE = CELL_SIZE - 20;

const cell = StyleSheet.create({
  cell: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'transparent'
  },
  button: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 5,
    backgroundColor: '#666'
  },
  label: {
    position: 'absolute',
    left: (CELL_SIZE - LABEL_SIZE) / 2,
    top: (CELL_SIZE - LABEL_SIZE) / 2,
    width: LABEL_SIZE,
    height: LABEL_SIZE,
    borderRadius: LABEL_SIZE / 2,
    backgroundColor: '#ccc'
  },
  value: {
    fontSize: 38,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Yanone Kaffeesatz',
    backgroundColor: 'transparent'
  },
  placed: {
    borderRadius: 5,
    backgroundColor: '#333'
  }
});

export default cell;
