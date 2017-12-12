import React from 'react';
import { connect, type Connector } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { setFilter, resetFilter } from '../actions';
import { getFilters } from '../reducers';

import ToggleGroup from '../components/ToggleGroup';

import type { State, ToggleGroup as TG } from '../types';

type StateProps = {
  filters: Array<TG>,
};

type DispatchProps = {
  onFilterChange: (value: string, index: number) => void,
  handleFilterReset: () => void,
};

type Props = DispatchProps & StateProps;

const Filter = ({
  filters,
  onFilterChange,
  handleFilterReset,
}: Props) => (
  <div className="mb-3">
    <Row>
      <Col sm={9}>
        <ToggleGroup
          resetable
          options={filters}
          onChangeHandler={onFilterChange}
        />
      </Col>
      <Col sm={3}>
        <h5 className="invisible">Reset filter</h5>
        <Button
          onClick={() => handleFilterReset()}
          className="btn btn-link btn-block"
        >
          reset filter
        </Button>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = (state: State) => ({
  filters: getFilters(state),
});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  {
    onFilterChange: setFilter,
    handleFilterReset: resetFilter,
  },
);

export default connector(Filter);
