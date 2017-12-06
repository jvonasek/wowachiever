// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { getRecentAchievements, getUnfinishedAchievements } from '../reducers';

import AchievementList from '../components/AchievementList';

import type { State } from '../types';

type StateProps = {
  recentAchievements: Array<Object>,
  unfinishedAchievements: Array<Object>,
}

type Props = StateProps;

const RecentAndIncompleteAchs = ({ recentAchievements, unfinishedAchievements }: Props) => {
  if (!recentAchievements.length) {
    return null;
  }

  return (
    <div>
      <Row>
        <Col>
          <h3 className="mb-4">Nearly finished</h3>
          <AchievementList achievements={unfinishedAchievements} viewType="compact" />
        </Col>
        <Col>
          <h3 className="mb-4">Recent</h3>
          <AchievementList achievements={recentAchievements} viewType="compact" />
        </Col>
      </Row>
    </div>
  );
};

RecentAndIncompleteAchs.defaultProps = {
  recentAchievements: [],
  unfinishedAchievements: [],
};

const mapStateToProps = (state: State) => ({
  recentAchievements: getRecentAchievements(state),
  unfinishedAchievements: getUnfinishedAchievements(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(RecentAndIncompleteAchs);
