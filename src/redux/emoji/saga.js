import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import actionTypes from './actionTypes';
import { save } from './actions';

function* loadUseCase() {
  const emojiList = yield call(() =>
    axios.get('https://api.github.com/emojis').then(res => res.data),
  );

  yield put(save(emojiList));
}

export default function* emojiSaga() {
  yield [takeLatest(actionTypes.LOAD_REQUEST, loadUseCase)];
}
