import React from 'react';
import { Row, Col } from 'reactstrap';


import ToggleButtons from './ToggleButtons';

import type { ToggleGroup as TG } from '../types';

type Props = {
  options: Array<TG>,
  onChangeHandler: (value: mixed, index: number) => void,
  resetable: boolean,
};

const ToggleGroup = ({ options, onChangeHandler, resetable }: Props) => (
  <Row>
    {options.length > 0 && options.map((item, index) => (
      <Col key={item.property}>
        <h5>{item.title}</h5>
        <ToggleButtons
          resetable={resetable}
          toggles={item.toggles}
          value={item.value}
          onChange={(value) => onChangeHandler(value, index)}
        />
      </Col>
    ))}
  </Row>
);

ToggleGroup.defaultProps = {
  options: [],
  onChangeHandler: () => {},
  resetable: false,
};

export default ToggleGroup;
