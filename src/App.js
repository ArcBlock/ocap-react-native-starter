import React from 'react';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Home from './pages/Home';
import Query from './pages/Query';
import Subscription from './pages/Subscription';

YellowBox.ignoreWarnings(['Method `jumpToIndex`']);

export default TabNavigator(
  {
    Home: { screen: Home },
    Query: { screen: Query },
    Subscription: { screen: Subscription },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Query') {
          iconName = 'ios-filing';
        } else if (routeName === 'Subscription') {
          iconName = 'ios-folder';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
