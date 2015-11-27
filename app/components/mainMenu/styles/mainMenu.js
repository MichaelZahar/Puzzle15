'use strict';

import React from 'react-native';

const {
  StyleSheet
} = React;

const mainMenu = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 72,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Yanone Kaffeesatz'
  },
  text: {
    fontSize: 36,
    marginTop: 10,
    marginBottom: 15,
    color: '#000',
    fontFamily: 'Yanone Kaffeesatz'
  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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

export default mainMenu;
