import { combineReducers } from 'redux';
import emojiReducer from './emoji/reducer';

const rootReducer = combineReducers({
  emoji: emojiReducer,
});

export default rootReducer;
