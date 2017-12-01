import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { getRecentAchievements, getUnfinishedAchievements } from '../reducers';

import AchievementList from '../components/AchievementList';

const RecentAndUnfinishedAchs = ({ recentAchievements, unfinishedAchievements }) => {
  if (!recentAchievements.length) {
    return null;
  }

  return (
    <div>
      <Row>
        <Col>
          <h3 className="mb-4">Nearly finished achievements</h3>
          <AchievementList achievements={unfinishedAchievements} viewType="compact" />
        </Col>
        <Col>
          <h3 className="mb-4">Recent achievements</h3>
          <AchievementList achievements={recentAchievements} viewType="compact" />
        </Col>
      </Row>
    </div>
  );
};

RecentAndUnfinishedAchs.defaultProps = {
  recentAchievements: [],
  unfinishedAchievements: [],
};

RecentAndUnfinishedAchs.propTypes = {
  recentAchievements: PropTypes.arrayOf(PropTypes.object),
  unfinishedAchievements: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  recentAchievements: getRecentAchievements(state),
  unfinishedAchievements: getUnfinishedAchievements(state),
});

export default connect(mapStateToProps)(RecentAndUnfinishedAchs);
