import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/storage'
import { receiveDecks } from '../actions'
import { grey, white, black, lightGrey } from '../utils/constants'

class Decks extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  render () {    
    const { decks } = this.props    

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => (
          <TouchableOpacity
            key={deck}
            onPress={() => this.props.navigation.navigate(
              'Deck',
              { deck: decks[deck] }
            )}
          >
            <View style={styles.deck}>
              <Text style={styles.title}>{decks[deck].title}</Text>
              <Text style={styles.cards}>{decks[deck].questions.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey,
  },
  deck: {
    backgroundColor: white,
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  title: {
    fontSize: 26,
    color: black,
  },
  cards: {
    fontSize: 20,
    marginTop: 5,
    color: lightGrey,
  },
})

function mapStateToProps (decks) {  
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
