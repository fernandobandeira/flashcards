import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Button from './Button'
import { grey, white, blue }  from '../utils/constants'
import { addQuestion }  from '../actions'
import { addCardToDeck } from '../utils/storage'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const { deck } = this.props.navigation.state.params;
    const { question, answer } = this.state

    addCardToDeck(deck.title, { question, answer })

    this.props.dispatch(addQuestion(deck.title, { question, answer }))
    
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Question'
            selectionColor={blue}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
          <TextInput
            style={styles.input}
            placeholder='Answer'
            selectionColor={blue}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
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
    justifyContent: 'flex-start',
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

export default connect()(AddCard)
