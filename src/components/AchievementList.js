import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import Achievement from '../components/Achievement';
import AchievementLite from '../components/AchievementLite';

const AchievementList = ({ achievements, viewType }) => {
  if (!achievements.length) {
    return <span className="h5">Looks like there is nothing here...</span>;
  }

  if (viewType === 'compact') {
    return (
      <Table>
        {achievements.map((achievement) => (
          <AchievementLite key={achievement.id} {...achievement} />
        ))}
      </Table>
    );
  }

  return achievements.map((achievement) => (
    <Achievement key={achievement.id} {...achievement} />
  ));
};

AchievementList.defaultProps = {
  achievements: [],
  viewType: 'full',
};

AchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  viewType: PropTypes.oneOf(['full', 'compact']),
};

export default AchievementList;
