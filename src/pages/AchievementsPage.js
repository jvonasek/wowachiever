import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGroupMenuItems } from '../reducers';

import GroupMenu from '../components/GroupMenu';
import RecentAndUnfinishedAchs from '../containers/RecentAndUnfinishedAchs';

const AchievementsPage = ({ groupMenuItems, match }) => (
  <div>
    <RecentAndUnfinishedAchs />
    <GroupMenu menuItems={groupMenuItems} path={match.path} />
  </div>
);

AchievementsPage.defaultProps = {
  groupMenuItems: [],
  match: null,
};

AchievementsPage.propTypes = {
  groupMenuItems: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
  groupMenuItems: getGroupMenuItems(state),
});

export default connect(mapStateToProps)(AchievementsPage);
