// @flow
import React from 'react';
import Select from 'react-select-plus';

import 'react-select-plus/dist/react-select-plus.css';

import FieldValidationMessage from '../components/FieldValidationMessage';

type Props = {
  input: {
    name: string,
    value: {
      value: string
    },
    onChange: (Object) => void,
    onBlur: (Object) => void,
  },
  meta: Object,
  options: Array<Object>,
};

const RealmSelectbox = ({
  input,
  options,
  meta,
}: Props) => (
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

export default RealmSelectbox;
