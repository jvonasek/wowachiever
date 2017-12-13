// @flow
import React, { Component } from 'react';
import { connect, type Connector } from 'react-redux';
import { Route } from 'react-router-dom';
import classnames from 'classnames';
import kebabCase from 'lodash/kebabCase';

import {
  Row,
  Col,
  Container,
} from 'reactstrap';

import {
  getCharacterInfo,
} from '../reducers';

import {
  setCharacterUrl,
  setRegion,
  fetchEverything,
} from '../actions';

import Header from '../containers/Header';
import CategoryRoutes from '../containers/CategoryRoutes';

import AchievementsPage from './AchievementsPage';

import type { State, BnetApiParams, Region } from '../types';
import type { CharacterState } from '../reducers/character';

type StateProps = {
  match: Object,
  characterInfo: CharacterState,
};

type DispatchProps = {
  fetchEverything: (params: BnetApiParams) => void,
  setCharacterUrl: (url: string) => void,
  setRegion: (region: Region) => void,
};

type Props = StateProps & DispatchProps;

class CharacterPage extends Component<Props> {
  componentDidMount() {
    const { params, url } = this.props.match;
    this.props.setCharacterUrl(url);
    this.props.setRegion(params.region);

    const { characterInfo: { isFetched } } = this.props;

    if (!isFetched) {
      this.props.fetchEverything(params);
    }
  }

  render() {
    const { match, characterInfo: { charClass } } = this.props;
    return (
      <div className={classnames('character-page', `bg-${kebabCase(charClass)}`)}>
        <Header />
        <Container>
          <Row>
            <Col>
              <h2>{match.params.category}</h2>
              <Route path={`${match.url}/achievements/`} exact component={AchievementsPage} />
              <CategoryRoutes />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  characterInfo: getCharacterInfo(state),
});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  {
    setCharacterUrl,
    setRegion,
    fetchEverything,
  },
);

export default connector(CharacterPage);
