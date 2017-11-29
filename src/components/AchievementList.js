import React from 'react';
import PropTypes from 'prop-types';

import Achievement from '../components/Achievement';

const AchievementList = ({ achievements }) => {
  if (!achievements.length) {
    return <span className="h5">Looks like there is nothing here...</span>;
  }

  return achievements.map((achievement) => (
    <Achievement key={achievement.id} {...achievement} />
  ));
};

AchievementList.defaultProps = {
  achievements: [],
};

AchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
};

export default AchievementList;
