import * as actions from './actions'
import deepFreeze from 'deep-freeze';

export default function Reducer(state = {}, action) {
  switch (action.type) {
    case actions.LOAD:
      return {
        columns: [
          {
            name: 'Backlog',
            cards: [
              { name: 'Create Template' },
              { name: 'Create MockUp' },
              { name: 'Adjust the Web header' }
            ],
            actionButton: 'Take'
          },
          {
            name: 'In Progress',
            cards: [
              { name: 'Initiate Docker for the Project' }
            ],
            actionButton: 'Evaluate'
          },
          {
            name: 'Evaluation',
            cards: [
              { name: 'Finalize the T.O.R' }
            ],
            actionButton: 'DONE'
          },
          {
            name: 'Done',
            cards: [
              { name: 'Recruit Ruby Developers' },
              { name: 'Recruit FE Developers' },
              { name: 'Recruit Project Manager' }
            ],
            actionButton: 'Delete'
          }
        ]
      };

    case actions.ADD: {
      const { card, index } = action
      const columns = JSON.parse(JSON.stringify(state.columns))
      columns[index].cards = [
        card,
        ...columns[index].cards
      ]
      console.log(columns)
      return { ...state, columns }
    }

    case actions.MOVE: {
      deepFreeze(state)
      const { index, cardIndex } = action
      const columns = JSON.parse(JSON.stringify(state.columns))
      columns[index] = {
        ...columns[index],
        cards: [...columns[index].cards]
      }
      columns[index + 1] = {
        ...columns[index + 1],
        cards: [...columns[index + 1].cards]
      }
      const [card] = columns[index].cards.splice(cardIndex, 1)
      columns[index + 1].cards.unshift(card)
      return { ...state, columns }
    }

    case actions.REMOVE: {
      const { index, cardIndex } = action
      const columns = JSON.parse(JSON.stringify(state.columns))
      columns[index] = {
        ...columns[index],
        cards: [...columns[index].cards]
      }
      columns[index].cards.splice(cardIndex, 1)
      return { ...state, columns }
    }
    default:
      return state
  }
} 