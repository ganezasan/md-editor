import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/markdown/markdown'); // without this css hints won't show

const hintRender = (elt, data, cur) => {
  const url =
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v8';
  const displayNode = `<img width="15" height="15" src="${url}" alt="icon" async></img> ${
    cur.text
  }`;
  elt.innerHTML = displayNode;
  elt.hintId = cur.i;
  return elt;
};

const emojiList = ['apple', 'abc', 'axz', 'bee', 'beam', 'bleach'].map(
  (key, i) => ({
    text: `${key}:`,
    className: 'emoji',
    i,
    render: hintRender,
  }),
);

const mentionList = [
  'taka',
  'koyo',
  'kato',
  'tanaka',
  'tachibana',
  'takashi',
].map((key, i) => ({
  text: key,
  className: 'mention',
  i,
  render: hintRender,
}));

const getHint = (editor, list) => ({
  hint: () => ({
    from: editor.getDoc().getCursor(),
    to: editor.getDoc().getCursor(),
    list,
  }),
  closeCharacters: /[\s()\[\]{};>,]/,
  completeSingle: false,
});

class Editor extends Component {
  handleKeyDown(editor, target) {
    if (target.key === '@') {
      const options = getHint(editor, mentionList);
      editor.showHint(options);
    } else if (target.key === ':') {
      const options = getHint(editor, emojiList);
      editor.showHint(options);
    }
  }

  render() {
    const { src, onChangeSrc } = this.props;
    const options = {
      mode: 'markdown',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      completeSingle: false,
      completeOnSingleClick: false,
    };

    return (
      <CodeMirror
        ref="CodeMirror"
        value={src}
        options={options}
        className="editor-pane"
        height="100%"
        onKeyDown={this.handleKeyDown}
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
