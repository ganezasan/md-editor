const mentionList = [
  'taka',
  'koyo',
  'kato',
  'tanaka',
  'tachibana',
  'takashi',
].reduce((keyValue, key) => {
  keyValue[key] =
    'https://github.global.ssl.fastly.net/images/icons/emoji/+1.png?v5';
  return keyValue;
}, {});

const hintRender = (elt, data, cur) => {
  const displayNode = `<img width="15" height="15" src="${
    cur.url
  }" alt="icon" async></img> ${cur.displayText}`;
  elt.innerHTML = displayNode;
  elt.hintId = cur.i;
  return elt;
};

const makeHint = (list, makeText, className, sc, cm, ejectWord) => {
  const matched = cm.getDoc().getRange(sc.from(), sc.to());
  const target = matched.replace(ejectWord, ''); // remove '@' in the head
  const filteredList = Object.keys(list)
    .filter(l => l.indexOf(target) !== -1)
    .slice(0, 20) // 件数を絞る
    .map((key, i) => ({
      text: makeText(key),
      displayText: key,
      className,
      i,
      render: hintRender,
      url: list[key],
    }));
  return {
    list: filteredList,
    from: sc.from(),
    to: sc.to(),
  };
};

const makeMentionHint = (list, sc, cm) =>
  makeHint(list, key => `@${key} `, 'menthionList', sc, cm, '@');

const makeEmojiHint = (list, sc, cm) =>
  makeHint(list, key => `:${key}: `, 'emojiList', sc, cm, ':');

const getSelector = (cm, pattern, currentPos) => {
  const sc = cm.getSearchCursor(pattern, currentPos, {
    multiline: false,
  });

  if (sc.findPrevious()) {
    const isInput =
      currentPos.line === sc.to().line && currentPos.ch === sc.to().ch;
    if (isInput) {
      return sc;
    }
  }
  return false;
};

export const autoComplete = (cm, emojiList) => {
  cm.showHint({
    hint: () => {
      const mentionPattern = /@[A-Za-z0-9]*$/;
      const emojiPattern = /:[^:\s]*$/;

      const currentPos = cm.getCursor();
      const mentionSc = getSelector(cm, mentionPattern, currentPos);
      const emojiSc = getSelector(cm, emojiPattern, currentPos);

      if (mentionSc) {
        return makeMentionHint(mentionList, mentionSc, cm);
      }
      if (emojiSc) {
        return makeHint(emojiList, emojiSc, cm);
      }
    },
    disableKeywords: false,
    completeSingle: false,
    completeOnSingleClick: false,
    closeCharacters: /[\s()\[\]{};>,]/, // eslint-disable-line no-useless-escape
  });
};
