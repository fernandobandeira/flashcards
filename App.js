import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

import Deck from './components/Deck'
import Decks from './components/Decks'
import CreateDeck from './components/CreateDeck'
import Question from './components/Question'
import AddCard from './components/AddCard'

import { grey, blue, white } from './utils/constants'
import { setLocalNotification } from './utils/helpers'

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
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  Question: {
    screen: Question,
  },
  AddCard: {
    screen: AddCard,
  },
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: blue,
    }
  },
})

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={styles.statusBar}>
            <StatusBar translucent backgroundColor={blue} barStyle='light-content' />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: blue,
  }
});
