import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case ADD_QUESTION:
      const { deck, question } = action

      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            question,
          ],
        },
      }
    default:
      return state
  }
}

export default decks
