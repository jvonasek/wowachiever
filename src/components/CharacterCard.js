import React from 'react';
import PropTypes from 'prop-types';

import BattlenetImage from '../containers/BattlenetImage';

const CharacterCard = ({
  achievementPoints,
  name,
  realm,
  thumbnail,
  ...rest
}) => name && (
  <div>
    <BattlenetImage
      width={60}
      alt={`${name} - ${realm}`}
      className="float-left mr-3 rounded"
      resourcePath={`character/${thumbnail}`}
    />
    <h2 className="font-weight-bold mb-0" style={{ color: rest.classColor }}>{name}</h2>
    <span className="h6">{rest.level} {rest.race} {rest.class} - {realm}, {achievementPoints} points</span>
  </div>
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
