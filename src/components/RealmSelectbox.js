import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';

import 'react-select-plus/dist/react-select-plus.css';

import FieldValidationMessage from '../components/FieldValidationMessage';

const RealmSelectbox = ({
  input,
  options,
  meta,
}) => (
  <div>
    <Select
      {...input}
      id={input.name}
      name={input.name}
      value={input.value.value}
      clearable={false}
      options={options}
      placeholder="Select or type to search..."
      onChange={({ value, region }) => input.onChange({ value, region })}
      onBlur={() => input.onBlur(input.value)}
    />
    <FieldValidationMessage {...meta} />
  </div>
);

RealmSelectbox.defaultProps = {
  meta: null,
  options: [],
};

RealmSelectbox.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  options: PropTypes.arrayOf(PropTypes.object),
};

export default RealmSelectbox;
