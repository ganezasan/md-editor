import { createSelector } from 'reselect';

export const emojiSelector = state => state.emoji;

export const getList = createSelector(emojiSelector, emoji => emoji.list);
