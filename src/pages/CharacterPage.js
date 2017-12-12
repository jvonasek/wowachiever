// @flow
import React, { Component } from 'react';
import { connect, type Connector } from 'react-redux';
import { Route } from 'react-router-dom';

import {
  Row,
  Col,
  Container,
} from 'reactstrap';

import {
  getCharacterInfo,
  getCharacterCriteria,
  getCompletedAchievements,
  getIsCharacterFetched,
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

type StateProps = {
  match: Object,
  isFetched: boolean,
};

type DispatchProps = {
  fetchEverything: (params: BnetApiParams) => void,
  setCharacterUrl: (url: string) => void,
  setRegion: (region: Region) => void,
};

type Props = StateProps & DispatchProps;

class CharacterPage extends Component<Props> {
  static defaultProps = {
    isFetched: false,
  }

  componentDidMount() {
    const { params, url } = this.props.match;
    this.props.setCharacterUrl(url);
    this.props.setRegion(params.region);

    const { isFetched } = this.props;

    if (!isFetched) {
      this.props.fetchEverything(params);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="character-page">
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
  characterCriteria: getCharacterCriteria(state),
  characterInfo: getCharacterInfo(state),
  completedAchievements: getCompletedAchievements(state),
  isFetched: getIsCharacterFetched(state),
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
