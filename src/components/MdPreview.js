import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const MdPreview = ({ src }) => (
  <div className="md-preview">
    <ReactMarkdown source={src} />
  </div>
);

MdPreview.propTypes = {
  src: PropTypes.string,
};

export default MdPreview;
