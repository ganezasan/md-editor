import actionTypes from './actionTypes';

const defaultState = {
  list: {
    '+1':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v8',
  },
};

export default function stickTest(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SAVE: {
      return { ...state, list: action.payload.list };
    }
    default:
      break;
  }
  return state;
}
