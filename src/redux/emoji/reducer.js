import actionTypes from './actionTypes';

const defaultState = {
  list: {
    '+1':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v8',
    '-1':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44e.png?v8',
    '100':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f4af.png?v8',
    '1234':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f522.png?v8',
    '1st_place_medal':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f947.png?v8',
    '2nd_place_medal':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f948.png?v8',
    '3rd_place_medal':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f949.png?v8',
    '8ball':
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3b1.png?v8',
    a: 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f170.png?v8',
  },
};

export default function stickTest(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.LOAD_REQUEST: {
      // TODO reducer側は何もしない
      return defaultState;
    }
    default:
      break;
  }
  return state;
}
