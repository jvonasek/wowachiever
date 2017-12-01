import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

import CharacterSelectForm from '../containers/CharacterSelectForm';

import { fetchEverything, fetchRealms } from '../actions';

import { normalizeApiParams } from '../utils';

class CharacterSelectPage extends Component {
  componentDidMount() {
    this.props.fetchRealms();
  }
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={12} lg={6}>
          <Jumbotron className="my-5 py-5">
            <h1 className="display-5 text-center">WoWACHIEVER</h1>
            <CharacterSelectForm
              onSubmit={(values, dispatch) => dispatch(fetchEverything(normalizeApiParams(values)))}
            />
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}


CharacterSelectPage.propTypes = {
  fetchRealms: PropTypes.func.isRequired,
};

export default connect(
  null,
  { fetchRealms },
)(CharacterSelectPage);
