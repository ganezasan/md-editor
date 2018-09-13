import React from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRenderer from 'remark-react';
import textToImage from 'remark-text-to-image';
import toc from 'remark-toc';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getList } from '../redux/emoji/selectors';

const MdPreview = ({ src, emojiList }) => (
  <div className="md-preview">
    {
      remark()
        .use(toc)
        .use(textToImage, {
          base: 'https://assets-cdn.github.com/images/icons/emoji/unicode/',
          list: emojiList, // [key: unicode]
        })
        .use(reactRenderer, {
          sanitize: false,
        })
        .processSync(src).contents
    }
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
