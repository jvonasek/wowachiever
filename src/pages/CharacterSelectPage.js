// @flow
import React, { Component } from 'react';
import { connect, type Connector } from 'react-redux';
import {
  Row,
  Col,
  Jumbotron,
  Container,
} from 'reactstrap';

import CharacterSelectForm from '../containers/CharacterSelectForm';

import { fetchEverything, fetchRealms, resetCharacter } from '../actions';

import { normalizeApiParams } from '../utils';

import type {
  CharFormParams,
  Dispatch,
} from '../types';

type DispatchProps = {
  fetchRealms: () => void,
  resetCharacter: () => void,
};

type Props = DispatchProps;

class CharacterSelectPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchRealms();
    this.props.resetCharacter();
  }
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={6}>
            <Jumbotron className="my-5 py-5">
              <h1 className="display-5 text-center">WoWACHIEVER</h1>
              <CharacterSelectForm
                onSubmit={(values: CharFormParams, dispatch: Dispatch) =>
                  dispatch(fetchEverything(normalizeApiParams(values)))}
              />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  null,
  { fetchRealms, resetCharacter },
);

export default connector(CharacterSelectPage);
