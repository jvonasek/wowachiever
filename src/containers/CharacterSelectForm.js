import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import flowRight from 'lodash/fp/flowRight';
import {
  FormGroup,
  Label,
} from 'reactstrap';

import { getRealms } from '../reducers';
import { createUrl } from '../utils';

// temporary values for development
const initialValues = {
  region: 'eu',
  character: 'Razzin',
  realm: 'argent-dawn',
};

const CharacterSelectForm = ({ handleSubmit, realms }) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <div className="form-check">
        <label htmlFor="region-eu" className="form-check-label">
          <Field
            name="region"
            component="input"
            type="radio"
            id="region-eu"
            value="eu"
            className="form-check-input"
          />{' '}
          EU
        </label>
      </div>
      <div className="form-check">
        <label htmlFor="region-us" className="form-check-label">
          <Field
            name="region"
            component="input"
            type="radio"
            id="region-us"
            value="us"
            className="form-check-input"
          />{' '}
          US
        </label>
      </div>

    </FormGroup>
    <FormGroup>
      <Label for="character">Character</Label>
      <Field
        className="form-control form-control-lg"
        id="character"
        name="character"
        component="input"
        type="text"
      />
    </FormGroup>
    <FormGroup>
      <Label for="realm">Realm</Label>
      <Field
        className="form-control form-control-lg"
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
  withRouter,
  connect(mapStateToProps),
  reduxForm({
    form: 'characterSelect',
    onSubmitSuccess: (res, dispatch, { history, values }) => {
      const { region, realm, character } = values;
      const redirectUrl = createUrl([region, realm, character, 'achievements']);
      history.push(redirectUrl);
    },
  }),
)(CharacterSelectForm);
