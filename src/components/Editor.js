import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/markdown/markdown'); // without this css hints won't show

const emojiList = ['apple:', ':abc:', 'axz:', 'bee:', 'beam:', 'bleach:'];
class Editor extends Component {
  handleKeyUpEvent(editor, target) {
    if (target.key === '@') {
      const options = {
        hint() {
          return {
            from: editor.getDoc().getCursor(),
            to: editor.getDoc().getCursor(),
            list: emojiList,
          };
        },
      };
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
        onKeyDown={this.handleKeyUpEvent}
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
