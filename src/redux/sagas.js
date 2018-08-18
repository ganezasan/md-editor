import { all } from 'redux-saga/effects';
import emojiSaga from './emoji/saga';

export default function* saga() {
  yield all(emojiSaga);
}
