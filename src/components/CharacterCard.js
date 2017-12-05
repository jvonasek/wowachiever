// @flow
import React from 'react';

import BattlenetImage from '../containers/BattlenetImage';

type Props = {
  achievementPoints: number,
  charClass: string,
  charRace: string,
  classColor: string,
  level: number,
  name: string,
  realm: string,
  thumbnail: string,
};

const CharacterCard = ({
  achievementPoints,
  charClass,
  charRace,
  classColor,
  level,
  name,
  realm,
  thumbnail,
}: Props) => name && (
  <div>
    <BattlenetImage
      width={60}
      alt={`${name} - ${realm}`}
      className="float-left mr-3 rounded"
      resourcePath={`character/${thumbnail}`}
    />
    <h2 className="font-weight-bold mb-0" style={{ color: classColor }}>{name}</h2>
    <span className="h6">{level} {charRace} {charClass} - {realm}, {achievementPoints} points</span>
  </div>
);

CharacterCard.defaultProps = {
  achievementPoints: 0,
  name: '',
  realm: '',
  thumbnail: '',
};

export default CharacterCard;
