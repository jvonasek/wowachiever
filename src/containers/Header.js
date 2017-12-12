// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
} from 'reactstrap';

import { getCharacterInfo } from '../reducers';

import CharacterCard from '../components/CharacterCard';
import SearchField from './SearchField';

import type { State } from '../types';

type StateProps = {
  characterInfo: Object,
}

type Props = StateProps;

const Header = ({ characterInfo }: Props) => (
  <div className="header">
    <Container>
      <Row>
        <Col>
          <CharacterCard {...characterInfo} />
        </Col>
        <Col>
          <div className="mt-3">
            <Row>
              <Col sm={8}>
                <SearchField />
              </Col>
              <Col sm={4}>
                <Link to="/" className="btn btn-secondary btn-block">Change character</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

Header.defaultProps = {
  characterInfo: null,
};

const mapStateToProps = (state: State) => ({
  characterInfo: getCharacterInfo(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(Header);
