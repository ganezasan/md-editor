import React from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/markdown/markdown');

const Editor = ({ src, onChangeSrc }) => (
  <CodeMirror
    value={src}
    options={{
      mode: 'markdown',
      theme: 'material',
      lineNumbers: true,
    }}
    className="editor-pane"
    height="100%"
    onChange={(editor, data, value) => {
      onChangeSrc(value);
    }}
  />
);

Editor.propTypes = {
  src: PropTypes.string,
  onChangeSrc: PropTypes.func,
};

export default Editor;
