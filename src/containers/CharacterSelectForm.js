import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import flowRight from 'lodash/fp/flowRight';
import {
  FormGroup,
  Label,
} from 'reactstrap';

import { getRealms } from '../reducers';

// temporary values for development
const initialValues = {
  region: 'eu',
  character: 'Razzin',
  realm: 'argent-dawn',
};

const CharacterSelectForm = ({ handleSubmit, realms }) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="character">Character</Label>
      <Field
        className="form-control"
        id="character"
        name="character"
        component="input"
        type="text"
      />
    </FormGroup>
    <FormGroup>
      <Label for="realm">Realm</Label>
      <Field
        className="form-control"
        id="realm"
        name="realm"
        component="select"
      >
        <option value="">Select a realm...</option>
        {realms.map(({ slug, name }) => (
          <option key={slug} value={slug}>{name}</option>
        ))}
      </Field>
    </FormGroup>
    <button className="btn btn-primary btn-lg" type="submit">Submit</button>
  </form>
);


CharacterSelectForm.defaultProps = {
  handleSubmit: () => {},
  realms: [],
};

CharacterSelectForm.propTypes = {
  handleSubmit: PropTypes.func,
  realms: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  initialValues,
  realms: getRealms(state),
});

export default flowRight(
  connect(mapStateToProps),
  reduxForm({
    form: 'characterSelect',
  }),
)(CharacterSelectForm);
