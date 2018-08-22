/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>OCAP React Native Starter</Text>

        <Text style={styles.header}>Libraries Integrated</Text>
        <Text style={styles.item}>react-navigation</Text>
        <Text style={styles.item}>react-native-vector-icons</Text>

        <Text style={styles.header}>SDK Documentation</Text>
        <Text style={styles.item}>github.com/Arcblock/ocap-javascript-sdk</Text>

        <Text style={styles.header}>Happy Coding!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10,
  },
  header: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
  },
  item: {
    color: '#333',
    marginBottom: 5,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});
