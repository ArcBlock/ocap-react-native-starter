/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { dataSources, getClient } from '../../libs/ocap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSources[0],
      message: null,
      timestamp: null,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const client = getClient(this.state.dataSource.name);

    // Subscription
    const subscription = await client.newBlockMined();
    subscription.on('data', data => {
      this.setState({
        message: data,
        timestamp: new Date(),
      });
    });

    this.setState({ loading: false });
  }

  render() {
    const { loading, summary, dataSource } = this.state;

    return (
      <View style={styles.container}>
        {loading && (
          <Text>
            Loading account summary for {dataSource.name.toUpperCase()} account:{' '}
            {dataSource.demoAddress}
          </Text>
        )}
        {loading || (
          <View>
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
