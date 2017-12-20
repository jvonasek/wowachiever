import { connect, type Connector } from 'react-redux';

import { setViewType } from '../actions';
import { getViewType } from '../reducers';

import ToggleGroup from '../components/ToggleGroup';

import type { State, ToggleGroup as TG } from '../types';

type StateProps = {
  options: Array<TG>
};

type DispatchProps = {
  onChangeHandler: (value: string, index: number) => void,
};

type Props = DispatchProps & StateProps;

const mapStateToProps = (state: State) => ({
  options: [getViewType(state)],
});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  {
    onChangeHandler: setViewType,
  },
);

export default connector(ToggleGroup);
