// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';

import { getGroupMenuItems, getClassColor } from '../reducers';

import GroupMenu from '../components/GroupMenu';
import RecentAndIncompleteAchs from '../containers/RecentAndIncompleteAchs';

import type { State } from '../types';

type StateProps = {
  classColor: string,
  groupMenuItems: Array<Object>,
  match: Object,
};

type Props = StateProps;

const AchievementsPage = ({ classColor, groupMenuItems, match }: Props) => (
  <div>
    <div className="mb-5">
      <RecentAndIncompleteAchs />
    </div>
    <h3 className="mb-4">Browse by category</h3>
    <GroupMenu menuItems={groupMenuItems} path={match.path} classColor={classColor} />
  </div>
);

AchievementsPage.defaultProps = {
  classColor: null,
  groupMenuItems: [],
};

const mapStateToProps = (state: State) => ({
  classColor: getClassColor(state),
  groupMenuItems: getGroupMenuItems(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(AchievementsPage);
