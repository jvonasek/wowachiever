import React from 'react';
import { connect, type Connector } from 'react-redux';

import { setSorting } from '../actions';
import { getSorting } from '../reducers';

import DropdownControl from '../components/DropdownControl';

import type { State, Dropdown } from '../types';

type StateProps = {
  sorting: Array<Dropdown>,
};

type DispatchProps = {
  onSortingChange: (value: string) => void,
};

type Props = DispatchProps & StateProps;

const Sorter = ({
  sorting,
  onSortingChange,
}: Props) => (
  <div className="mb-3">
    <h5>{sorting.title}</h5>
    <DropdownControl
      options={sorting.options}
      value={sorting.value}
      onChangeHandler={onSortingChange}
    />
  </div>
);

const mapStateToProps = (state: State) => ({
  sorting: getSorting(state),
});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  {
    onSortingChange: setSorting,
  },
);

export default connector(Sorter);
