import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getList } from '../redux/emoji/selectors';
import { autoComplete } from './autoComplete';

require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/mode/gfm/gfm'); // without this css hints won't show
require('codemirror/addon/search/searchcursor');

class Editor extends Component {
  state = {
    value: this.props.src,
  };

  render() {
    const { onChangeSrc, emojiList } = this.props;
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
          autoComplete(editor, emojiList);
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
  emojiList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  emojiList: getList,
});

export default connect(
  mapStateToProps,
  null,
)(Editor);
