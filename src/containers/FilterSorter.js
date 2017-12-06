import React from 'react';
import { connect, type Connector } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { setFilter, resetFilter } from '../actions';
import { getFilters } from '../reducers';

import ButtonToggles from '../components/ButtonToggles';

import type { State, Filter } from '../types';

type StateProps = {
  filters: Array<Filter>
};

type DispatchProps = {
  onFilterChange: (value: string, index: number) => void,
  handleFilterReset: () => void,
};

type Props = DispatchProps & StateProps;

const FilterSorter = ({
  filters,
  onFilterChange,
  handleFilterReset,
}: Props) => (
  <div className="mb-3">
    <Row>
      {filters.map((filter, index) => (
        <Col sm={3} key={filter.prop} className="mb-3">
          <h5>{filter.title}</h5>
          <ButtonToggles
            toggles={filter.toggles}
            value={filter.value}
            onChange={(value) => onFilterChange(value, index)}
          />
        </Col>
      ))}
    </Row>
    <Row>
      <Col>
        <Button
          onClick={() => handleFilterReset()}
          className="btn btn-link"
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

export default connector(FilterSorter);
