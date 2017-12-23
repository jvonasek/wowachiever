// @flow
import React, { Component } from 'react';
import { connect, type Connector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import classnames from 'classnames';
import kebabCase from 'lodash/kebabCase';

import {
  Row,
  Col,
  Container,
} from 'reactstrap';

import {
  getCharacterInfo,
  getCharacterUrl,
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
import IncompleteAchsPage from './IncompleteAchsPage';

import IncompleteAndRecentOverview from '../components/IncompleteAndRecentOverview';

import type { State, BnetApiParams, Region } from '../types';
import type { CharacterInfo } from '../reducers/character';


type StateProps = {
  characterInfo: CharacterInfo,
  characterUrl: string,
  isCharacterFetched: boolean,
  match: Object,
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

    const { isCharacterFetched } = this.props;

    if (!isCharacterFetched) {
      this.props.fetchEverything(params);
    }
  }

  render() {
    const {
      characterInfo: { charClass },
      characterUrl,
      isCharacterFetched,
    } = this.props;

    if (isCharacterFetched) {
      return (
        <div className={classnames('character-page', `bg-${kebabCase(charClass)}`)}>
          <Header />
          <Container>
            <Row>
              <Col>
                <Route
                  exact
                  path={characterUrl}
                  render={() => (
                    <div>
                      <IncompleteAndRecentOverview characterUrl={characterUrl} />
                      <Row>
                        <Col className="text-center">
                          <Link
                            className="btn btn-info btn-lg my-5"
                            to={`${characterUrl}/achievements`}
                          >
                            Browse achievements by category
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  )}
                />
                <Route path={`${characterUrl}/achievements`} exact component={AchievementsPage} />
                <Route path={`${characterUrl}/incomplete`} exact component={IncompleteAchsPage} />
                <CategoryRoutes />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: State) => ({
  characterInfo: getCharacterInfo(state),
  characterUrl: getCharacterUrl(state),
  isCharacterFetched: getIsCharacterFetched(state),
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
