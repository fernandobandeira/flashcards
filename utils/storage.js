import { AsyncStorage } from 'react-native'
import { KEY } from './constants'

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
  return AsyncStorage.getItem(KEY)
    .then((data) => {
      if (data === null) {
        return dummyData
      }
      
      return JSON.parse(data)
    })
}

export function getDeck (title) {
  return getDecks()
    .then((data) => data[title] || null)
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    },
  }))
}

export function addCardToDeck (title, card) {
  return getDeck(title)
    .then(deck => 
      AsyncStorage.mergeItem(KEY, JSON.stringify({
        [title]: {
          ...deck,
          questions: [
            ...deck.questions,
            card,
          ],
        },
      }))
    )
}