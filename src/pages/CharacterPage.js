import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {
  Row,
  Col,
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

class CharacterPage extends Component {
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
      <div>
        <Header />
        <Row>
          <Col>
            <h2>{match.params.category}</h2>
            <Route path={`${match.url}/achievements/`} exact component={AchievementsPage} />
            <CategoryRoutes />
          </Col>
        </Row>
      </div>
    );
  }
}

CharacterPage.defaultProps = {
  isFetched: false,
  match: {},
};

CharacterPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  fetchEverything: PropTypes.func.isRequired,
  isFetched: PropTypes.bool,
  setCharacterUrl: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  characterCriteria: getCharacterCriteria(state),
  characterInfo: getCharacterInfo(state),
  completedAchievements: getCompletedAchievements(state),
  isFetched: getIsCharacterFetched(state),
});

export default connect(
  mapStateToProps,
  {
    setCharacterUrl,
    setRegion,
    fetchEverything,
  },
)(CharacterPage);
