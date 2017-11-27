import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

const RealmSelectbox = ({
  input,
  options,
}) => (
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
);

RealmSelectbox.defaultProps = {
  options: [],
};

RealmSelectbox.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default RealmSelectbox;
