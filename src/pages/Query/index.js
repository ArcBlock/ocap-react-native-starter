/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { dataSources, getClient } from '../../libs/ocap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSources[0],
      summary: null,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const client = getClient(this.state.dataSource.name);

    const summary = await client.accountByAddress({
      address: this.state.dataSource.demoAddress,
    });

    this.setState({ loading: false, summary });
  }

  render() {
    const { loading, summary, dataSource } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Query Demo</Text>
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
