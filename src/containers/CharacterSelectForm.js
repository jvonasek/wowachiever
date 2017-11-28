import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import flowRight from 'lodash/fp/flowRight';
import { FormGroup, Label } from 'reactstrap';

import { getRealms } from '../reducers';
import { createUrl } from '../utils';

import RealmSelectbox from '../components/RealmSelectbox';
import FieldWithMessage from '../components/FieldWithMessage';

import { required, alphaNumeric } from '../utils/validators';

const CharacterSelectForm = ({ handleSubmit, realms }) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="character">Character</Label>
      <Field
        className="form-control"
        id="character"
        name="character"
        component={FieldWithMessage}
        validate={required}
        warn={alphaNumeric}
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
        validate={required}
      />
    </FormGroup>
    <button className="btn btn-info btn-block btn-lg mt-4" type="submit">Submit</button>
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
