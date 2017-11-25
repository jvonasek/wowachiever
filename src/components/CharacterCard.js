import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import BattlenetImage from '../containers/BattlenetImage';

const CharacterCard = ({
  achievementPoints,
  name,
  realm,
  thumbnail,
  ...rest
}) => (
  <Row>
    <Col sm={6}>
      <BattlenetImage
        width={60}
        alt={`${name} - ${realm}`}
        className="float-left mr-3 rounded"
        resourcePath={`character/${thumbnail}`}
      />
      <h4 className="font-weight-bold mb-0" style={{ color: rest.classColor }}>{name}</h4>
      <span className="h6">{rest.level} {rest.race} {rest.class} - {realm}</span>
    </Col>
    <Col sm={6}>
      <div className="text-right h5 mt-2">Points: {achievementPoints}</div>
    </Col>
  </Row>
);

CharacterCard.defaultProps = {
  achievementPoints: 0,
  name: '',
  realm: '',
  thumbnail: '',
};

CharacterCard.propTypes = {
  achievementPoints: PropTypes.number,
  name: PropTypes.string,
  realm: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default CharacterCard;
