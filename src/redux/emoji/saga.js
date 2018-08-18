import { takeLatest } from 'redux-saga/effects';
import actionTypes from './actionTypes';

function* loadUseCase() {
  // TODO APIをコールして絵文字リストを取得する
}

export default function* stickTestSaga() {
  yield [takeLatest(actionTypes.LOAD_REQUEST, loadUseCase)];
}
