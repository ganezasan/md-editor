import actionTypes from './actionTypes';

export function load() {
  return { type: actionTypes.LOAD_REQUEST };
}

export function save(list) {
  return {
    type: actionTypes.SAVE,
    payload: {
      list,
    },
  };
}
