// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import { connect, type Connector } from 'react-redux';
import { FormGroup, Label } from 'reactstrap';
import flowRight from 'lodash/fp/flowRight';

import { getRealms } from '../reducers';
import { createUrl, normalizeApiParams } from '../utils';

import RealmSelectbox from '../components/RealmSelectbox';
import FieldWithMessage from '../components/FieldWithMessage';

import { required, alphaNumeric } from '../utils/validators';

import type { State } from '../types';

type OwnProps = {
  handleSubmit: () => void,
};

type StateProps = {
  realms: Array<Object>,
}

type Props = OwnProps & StateProps;

const CharacterSelectForm = ({ realms, handleSubmit }: Props) => (
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
  realms: [],
};

const mapStateToProps = (state: State) => ({
  realms: getRealms(state),
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default flowRight(
  connector,
  reduxForm({
    form: 'characterSelect',
    onSubmitSuccess: (res, dispatch, { values }) => {
      if (res && values) {
        const { region, realm, character } = normalizeApiParams(values);
        const redirectUrl = createUrl([
          region,
          realm,
          character,
          'achievements',
        ]);
        dispatch(push(redirectUrl));
      }
    },
  }),
)(CharacterSelectForm);
