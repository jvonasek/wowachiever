// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';

import { getGroupMenuItems, getClassColor, getCharacterUrl } from '../reducers';

import GroupMenu from '../components/GroupMenu';

import type { State } from '../types';

type StateProps = {
  characterUrl: string,
  classColor: string,
  groupMenuItems: Array<Object>,
};

type Props = StateProps;

const AchievementsPage = ({ classColor, groupMenuItems, characterUrl }: Props) => (
  <div>
    <h2 className="mb-4">Achievements</h2>
    <GroupMenu menuItems={groupMenuItems} path={characterUrl} classColor={classColor} />
  </div>
);

AchievementsPage.defaultProps = {
  classColor: null,
  groupMenuItems: [],
};

const mapStateToProps = (state: State) => ({
  characterUrl: getCharacterUrl(state),
  classColor: getClassColor(state),
  groupMenuItems: getGroupMenuItems(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(AchievementsPage);
