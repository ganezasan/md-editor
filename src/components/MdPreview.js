import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import emoji from 'emoji-dictionary';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getList } from '../redux/emoji/selectors';

const makeImage = (name, url) => (
  <img width="15" height="15" src="${url}" alt="${name}" async />
);

const emojiSupport = (text, emojiList) =>
  text.replace(
    /:\w+:/gi,
    name => emoji.getUnicode(name),
    // const key = name.replace(/:/g, '');
    // TODO 画像にならない
    // const emojiUrl = emojiList[key];
    // return emojiUrl ? makeImage(key, emojiUrl) : name;
  );

const MdPreview = ({ src, emojiList }) => (
  // console.log(emojiList);
  <div className="md-preview">
    <ReactMarkdown
      source={src}
      renderers={{ text: text => emojiSupport(text, emojiList) }}
    />
  </div>
);

MdPreview.propTypes = {
  src: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  emojiList: getList,
});

export default connect(
  mapStateToProps,
  null,
)(MdPreview);
