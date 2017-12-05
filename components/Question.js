import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Button from './Button'
import { getDeck } from '../utils/storage'
import { white, black, blue, lightGrey, green, red } from '../utils/constants'

export default class Question extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Quiz`,
  })

  state = {
    question: 0,
    text: '',
    toggle: 'Answer',
    correct: 0,
    bounceValue: new Animated.Value(1),
  }

  componentWillMount () {
    const { deck } = this.props.navigation.state.params

    this.setState({
      text: deck.questions[0].question,
    })
  }

  animateText () {
    const { bounceValue } = this.state

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start()
  }

  flipCard = () => {
    const { deck } = this.props.navigation.state.params
    const { toggle, question } = this.state

    this.animateText()

    if (toggle === 'Answer') {
      return this.setState({
        text: deck.questions[question].answer,
        toggle: 'Question',
      })
    }

    this.setState({
      text: deck.questions[question].question,
      toggle: 'Answer',
    })
  }

  correctPress = () => {
    this.setState({
      correct: this.state.correct + 1,
    })

    this.nextQuestion()
  }

  nextQuestion = () => {
    const { deck } = this.props.navigation.state.params
    const question = this.state.question + 1;

    if (question === deck.questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)

      return this.setState({
        question,
      })
    }

    this.setState({
      question,
      text: deck.questions[question].question,
      toggle: 'Answer',
    })

    this.animateText()
  }

  restart = () => {
    const { deck } = this.props.navigation.state.params

    this.setState({
      correct: 0,
      question: 0,
      toggle: 'Answer',
      text: deck.questions[0].question,
    })      
  }

  render () {
    const { deck } = this.props.navigation.state.params
    const { toggle, question, text, bounceValue, correct } = this.state
    
    if (question === deck.questions.length) {
      return (
        <View style={styles.final}>
          <Text style={styles.finalText}>You've scored {((correct * 100) / deck.questions.length).toFixed(0)}%</Text>
          <Button 
            style={[styles.button, { backgroundColor: blue }]}
            onPress={this.restart}
          >
            <Text style={styles.buttonText}>
              Restart Quiz
            </Text>
          </Button>
          <Button 
            style={[styles.button, { backgroundColor: blue }]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>
              Back to Deck
            </Text>
          </Button>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <Text style={styles.progressText}>
            {question + 1} / {deck.questions.length}
          </Text>
        </View>
        <View>
          <Animated.Text style={[styles.question, { transform: [{ scale: bounceValue }] }]}>{text}</Animated.Text>
          <TouchableOpacity onPress={this.flipCard}>
            <Text style={styles.answer}>{toggle}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button 
            style={[styles.button, { backgroundColor: green }]}
            onPress={this.correctPress}
          >
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </Button>
          <Button 
            style={[styles.button, { backgroundColor: red }]}
            onPress={this.nextQuestion}
          >
            <Text style={styles.buttonText}>
              Incorrect
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
  },
  progress: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
  },
  progressText: {
    fontSize: 20,
    color: black,
  },
  question: {
    fontSize: 36,
    textAlign: 'center',
    color: black,
  },
  answer: {
    fontSize: 20,
    marginTop: 10,
    color: lightGrey,
    textAlign: 'center',
  },
  buttons: {
    marginBottom: 50,
  },
  button: {
    alignSelf: 'center',
    paddingTop: 15,    
    paddingBottom: 15,
    width: 140,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: white,
  },
  final: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  finalText: {
    fontSize: 20,
    color: black,
    textAlign: 'center',
  }
})
