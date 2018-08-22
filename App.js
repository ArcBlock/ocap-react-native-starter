/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import OCAPClient from '@arcblock/ocap-js';

const dataSources = [
  {
    name: 'btc',
    demoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  },
  {
    name: 'eth',
    demoAddress: '0xe65d3128feafd14d472442608daf94bceb91e333',
  },
];
// Create clients for BTC and ETH
const clients = dataSources.reduce((obj, ds) => {
  obj[ds.name] = new OCAPClient({
    dataSource: ds.name,
    enableSubscription: true,
    enableMutation: false,
  });
  return obj;
}, {});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSources[0],
      summary: null,
      message: null,
      timestamp: null,
      loading: false,
    };
  }

  getClient() {
    return clients[this.state.dataSource.name];
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const client = this.getClient();

    const summary = await client.accountByAddress({
      address: this.state.dataSource.demoAddress,
    });

    // Subscription
    // const subscription = await client.newBlockMined();
    // subscription.on('data', data => {
    //   this.setState({
    //     message: data,
    //     timestamp: new Date(),
    //   });
    // });

    this.setState({ loading: false, summary });
  }

  render() {
    const { loading, summary, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        {loading && (
          <Text>
            Loading account summary for {dataSource.name.toUpperCase()} account:{' '}
            {dataSource.demoAddress}
          </Text>
        )}
        {loading || (
          <View className="App-json">
            <Text>
              Account summary for {dataSource.name.toUpperCase()} account: {dataSource.demoAddress}
            </Text>
            <Text style={styles.code}>{JSON.stringify(summary, true, '  ')}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  code: {
    backgroundColor: '#EEEE',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#AAAA',
  },
});
