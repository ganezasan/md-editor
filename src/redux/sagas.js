import { fork } from 'redux-saga/effects';
import emojiSaga from './emoji/saga';

export default function* saga() {
  yield fork(emojiSaga);
}
