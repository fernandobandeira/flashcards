import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { getDeck } from '../utils/storage'
import { white, black, blue, lightGrey } from '../utils/constants'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

  render () {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cards}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deck }
            )}
          >
            <Text style={styles.buttonText}>
              Add Card
            </Text>
          </Button>
          {deck.questions.length !== 0 && (
            <Button 
              style={[styles.button, { backgroundColor: blue }]}
              onPress={() => this.props.navigation.navigate(
                'Question',
                { deck, question: 1 }
              )}
            >
              <Text style={[styles.buttonText, { color: white }]}>
                Start Quiz
              </Text>
            </Button>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: white,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    color: black,
  },
  cards: {
    fontSize: 26,
    marginTop: 5,
    color: lightGrey,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    paddingTop: 15,    
    paddingBottom: 15,
    width: 140,
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 2,
    borderColor: blue,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: blue,
  },
})

function mapStateToProps (decks, { navigation }) {
  return {
    deck: decks[navigation.state.params.deck.title],
  }
}

export default connect(mapStateToProps)(Deck)
