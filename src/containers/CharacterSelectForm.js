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

import RealmSelectbox from '../components/RealmSelectbox';

// temporary values for development
const initialValues = {
  character: 'Razzin',
  realm: {
    value: 'argent-dawn',
    region: 'eu',
  },
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
        id="realm"
        name="realm"
        component={RealmSelectbox}
        options={realms}
      />
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
      const { realm, character } = values;
      const redirectUrl = createUrl([realm.region, realm.value, character, 'achievements']);
      history.push(redirectUrl);
    },
  }),
)(CharacterSelectForm);
