import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { Constants } from 'expo'

import Deck from './components/Deck'
import Decks from './components/Decks'
import CreateDeck from './components/CreateDeck'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar translucent />
        </View>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
