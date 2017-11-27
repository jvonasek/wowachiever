import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRecentAchievements, getUnfinishedAchievements } from '../reducers';

import AchievementList from '../components/AchievementList';

const RecentAchievements = ({ recentAchievements, unfinishedAchievements }) => {
  if (!recentAchievements.length) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4">Nearly finished achievements</h2>
      <AchievementList achievements={unfinishedAchievements} />
      <h2 className="mb-4">Recent achievements</h2>
      <AchievementList achievements={recentAchievements} />
    </div>
  );
};

RecentAchievements.defaultProps = {
  recentAchievements: [],
  unfinishedAchievements: [],
};

RecentAchievements.propTypes = {
  recentAchievements: PropTypes.arrayOf(PropTypes.object),
  unfinishedAchievements: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  recentAchievements: getRecentAchievements(state),
  unfinishedAchievements: getUnfinishedAchievements(state),
});

export default connect(mapStateToProps)(RecentAchievements);
