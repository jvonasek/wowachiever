import React from 'react';
import PropTypes from 'prop-types';

const CharacterCard = ({
  name,
  realm,
  thumbnail,
}) => (
  <div>
    <img
      className="float-left mr-3"
      src={`https://render-eu.worldofwarcraft.com/character/${thumbnail}`}
      alt={`${name} - ${realm}`}
    />
    <h2 className="display-5">{name}</h2>
    <p className="lead">{realm}</p>
  </div>
);

CharacterCard.defaultProps = {
  name: '',
  realm: '',
  thumbnail: '',
};

CharacterCard.propTypes = {
  name: PropTypes.string,
  realm: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default CharacterCard;
