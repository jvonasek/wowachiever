// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';

import { getGroupMenuItems } from '../reducers';

import GroupMenu from '../components/GroupMenu';
import RecentAndIncompleteAchs from '../containers/RecentAndIncompleteAchs';

import type { State } from '../types';

type StateProps = {
  groupMenuItems: Array<Object>,
  match: Object,
};

type Props = StateProps;

const AchievementsPage = ({ groupMenuItems, match }: Props) => (
  <div>
    <RecentAndIncompleteAchs />
    <GroupMenu menuItems={groupMenuItems} path={match.path} />
  </div>
);

AchievementsPage.defaultProps = {
  groupMenuItems: [],
};

const mapStateToProps = (state: State) => ({
  groupMenuItems: getGroupMenuItems(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(AchievementsPage);
