import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRegion } from '../reducers';

const BattlenetImage = ({
  alt,
  region,
  resourcePath,
  ...rest
}) => (
  <img
    src={`https://render-${region}.worldofwarcraft.com/${resourcePath}`}
    alt={alt}
    {...rest}
  />
);

BattlenetImage.propTypes = {
  alt: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  region: getRegion(state),
});

export default connect(mapStateToProps, {})(BattlenetImage);
