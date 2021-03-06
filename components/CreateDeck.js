import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Button from './Button'
import { grey, white, blue }  from '../utils/constants'
import { addDeck }  from '../actions'
import { saveDeckTitle } from '../utils/storage'

class CreateDeck extends Component {
  state = {
    title: '',
  }

  submit = () => {
    const { title } = this.state

    saveDeckTitle(title)

    this.props.dispatch(addDeck({
      [title]: {
        title,
        questions: [],
      },
    }))
    
    this.props.navigation.navigate(
      'Deck',
      {
        deck: {
          title,
          questions: [],
        },
      }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            What is the title of your new deck?
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Deck name'
            selectionColor={blue}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <Button style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: blue,
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: blue,
    width: 300,
  },
  button: {
    alignSelf: 'center',
    paddingTop: 15,    
    paddingBottom: 15,
    width: 140,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: blue,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: white,
  },
})

export default connect()(CreateDeck)
