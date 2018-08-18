import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/markdown/markdown'); // without this css hints won't show

const hintRender = (elt, data, cur) => {
  const url =
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v8';
  const displayNode = `<img width="15" height="15" src="${url}" alt="icon" async></img> ${
    cur.displayText
  }`;
  elt.innerHTML = displayNode;
  elt.hintId = cur.i;
  return elt;
};

const makeHintLists = (target, list, makeText, makeDisplayText, className) =>
  list.filter(l => l.indexOf(target) !== -1).map((key, i) => ({
    text: makeText(key),
    displayText: makeDisplayText(key),
    className,
    i,
    render: hintRender,
  }));

const emojiList = ['apple', 'abc', 'axz', 'bee', 'beam', 'bleach'].map(
  key => `${key}: `,
);
const mentionList = [
  'taka',
  'koyo',
  'kato',
  'tanaka',
  'tachibana',
  'takashi',
].map(key => `${key} `); // 最後にスペース入れることで、選択が終わりというのが表現できている

class Editor extends Component {
  state = {
    value: this.props.src,
  };

  autoComplete = cm => {
    cm.showHint({
      hint: () => {
        const cur = cm.getCursor();
        const token = cm.getTokenAt(cur);
        const start = token.start;
        const end = token.ch;

        if (token.string.indexOf('@') === 0) {
          const list = makeHintLists(
            token.string.slice(1),
            mentionList,
            key => `@${key}`,
            key => `${key}`,
            'menthionList',
          );

          return {
            list,
            from: codemirror.Pos(cur.line, start),
            to: codemirror.Pos(cur.line, end),
          };
        }
        if (token.string.indexOf(':') === 0) {
          const list = makeHintLists(
            token.string.slice(1),
            emojiList,
            key => `:${key}`,
            key => `:${key}`,
            'emojiList',
          );
          return {
            list,
            from: codemirror.Pos(cur.line, start),
            to: codemirror.Pos(cur.line, end),
          };
        }
      },
      completeSingle: false,
      closeCharacters: /[\s()\[\]{};>,]/, // eslint-disable-line no-useless-escape
      completeOnSingleClick: false,
    });
  };

  render() {
    const { onChangeSrc } = this.props;
    const options = {
      mode: 'gfm',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
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

export default Editor;
