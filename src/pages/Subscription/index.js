/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

import { dataSources, getClient } from '../../libs/ocap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSources[1],
      message: null,
      timestamp: null,
      subscribed: false,
    };
  }

  async componentDidMount() {
    const client = getClient(this.state.dataSource.name);

    const subscription = await client.newBlockMined();
    subscription
      .on('data', data => {
        this.setState({
          message: data,
          timestamp: new Date(),
        });

        setTimeout(() => {
          this.setState({ message: null });
        }, 5000);
      })
      .on('error', err => {
        this.setState({ message: err });
      });

    this.setState({ subscribed: true });
  }

  render() {
    const { subscribed, message, timestamp, dataSource } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Subscription Demo</Text>

        {subscribed || (
          <Text style={{ marginBottom: 15 }}>
            Try to subscribe to {dataSource.name.toUpperCase()}
            .newBlockMined
          </Text>
        )}

        {subscribed && (
          <Text style={{ marginBottom: 15 }}>
            {dataSource.name.toUpperCase()}
            .newBlockMined subscription success
          </Text>
        )}

        {subscribed &&
          !message && (
            <View>
              <Text style={{ marginBottom: 15 }}>Waiting for data</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

        {message && (
          <View style={{flex: 1}}>
            <Text style={{ marginBottom: 15 }}>
              New {dataSource.name.toUpperCase()} blocked mined at {timestamp.toString()}:
            </Text>
            <Text style={styles.code}>{JSON.stringify(message, true, '  ')}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  code: {
    backgroundColor: '#EEEE',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#AAAA',
  },
});
