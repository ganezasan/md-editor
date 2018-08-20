import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getList } from '../redux/emoji/selectors';

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/gfm/gfm'); // without this css hints won't show
require('codemirror/addon/search/searchcursor');

const hintRender = (elt, data, cur) => {
  const displayNode = `<img width="15" height="15" src="${
    cur.url
  }" alt="icon" async></img> ${cur.displayText}`;
  elt.innerHTML = displayNode;
  elt.hintId = cur.i;
  return elt;
};

const makeHintLists = (
  target,
  list,
  makeText,
  makeDisplayText,
  className,
  original,
) =>
  list.filter(l => l.indexOf(target) !== -1).map((key, i) => ({
    text: makeText(key),
    displayText: makeDisplayText(key),
    className,
    i,
    render: hintRender,
    url: original[key],
  }));

const makeEmojiList = list => Object.keys(list).map(key => `${key}`);
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

class Editor extends Component {
  state = {
    value: this.props.src,
  };

  autoComplete = cm => {
    cm.showHint({
      hint: () => {
        const pattern = /@[A-Za-z0-9]*$/;

        const currentPos = cm.getCursor();
        const sc = cm.getSearchCursor(pattern, currentPos, {
          multiline: false,
        });

        if (sc.findPrevious()) {
          const isInputtingEmoji =
            currentPos.line === sc.to().line && currentPos.ch === sc.to().ch;
          if (!isInputtingEmoji) {
            return;
          }
        } else {
          return;
        }

        const matched = cm.getDoc().getRange(sc.from(), sc.to());
        const term = matched.replace('@', ''); // remove '@' in the head

        const list = Object.keys(mentionList)
          .filter(l => l.indexOf(term) !== -1)
          .map((key, i) => ({
            text: `@${key} `,
            displayText: `${key}`,
            className: ['mention'],
            i,
            render: hintRender,
            url: mentionList[key],
          }));

        return {
          list,
          from: sc.from(),
          to: sc.to(),
        };

        // const cur = cm.getCursor();
        // const token = cm.getTokenAt(cur);
        // const start = token.start;
        // const end = token.ch;
        //
        // console.log(cur);
        // console.log(token);
        // if (token.string.indexOf('@') === 0) {
        //   const list = makeHintLists(
        //     token.string.slice(1),
        //     Object.keys(mentionList).map(key => `${key}`),
        //     key => `@${key} `,
        //     key => `${key}`,
        //     'menthionList',
        //     mentionList,
        //   );
        //
        //   return {
        //     list,
        //     from: codemirror.Pos(cur.line, start),
        //     to: codemirror.Pos(cur.line, end),
        //   };
        // }
        // if (token.string.indexOf(':') === 0) {
        //   const list = makeHintLists(
        //     token.string.slice(1),
        //     makeEmojiList(this.props.emojiList),
        //     key => `:${key}: `,
        //     key => `:${key}: `,
        //     'emojiList',
        //     this.props.emojiList,
        //   );
        //   return {
        //     list,
        //     from: codemirror.Pos(cur.line, start),
        //     to: codemirror.Pos(cur.line, end),
        //   };
        // }
      },
      disableKeywords: false,
      completeSingle: false,
      completeOnSingleClick: false,
      closeCharacters: /[\s()\[\]{};>,]/, // eslint-disable-line no-useless-escape
    });
  };

  render() {
    const { onChangeSrc } = this.props;
    const options = {
      mode: 'gfm',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      closeCharacters: /[\s()\[\]{};>,]/, // eslint-disable-line no-useless-escape
      emoji: true,
    };

    return (
      <CodeMirror
        ref="CodeMirror"
        value={this.state.value}
        options={options}
        className="editor-pane"
        height="100%"
        onBeforeChange={(editor, data, value) => {
          this.autoComplete(editor);
          this.setState({
            value,
          });
        }}
        onChange={(editor, target, value) => {
          onChangeSrc(value);
        }}
      />
    );
  }
}

Editor.propTypes = {
  src: PropTypes.string,
  onChangeSrc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  emojiList: getList,
});

export default connect(
  mapStateToProps,
  null,
)(Editor);
