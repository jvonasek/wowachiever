// @flow
import { connect, type Connector } from 'react-redux';

import { getIncompleteAchievements } from '../reducers';

import AchievementList from '../components/AchievementList';

import type { State, Achievement, ViewTypes } from '../types';

type OwnProps = {
  limit?: number,
};

type StateProps = {
  achievements: Array<Achievement>,
  viewType: ViewTypes,
};

type Props = OwnProps & StateProps;

const mapStateToProps = (state: State, props) => ({
  achievements: getIncompleteAchievements(state, props),
  viewType: 'compact',
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(AchievementList);
