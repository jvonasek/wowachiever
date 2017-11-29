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
  setBaseUrl,
  setRegion,
  fetchEverything,
} from '../actions';

import CharacterCard from '../components/CharacterCard';
import RecentAchievements from '../containers/RecentAchievements';
import CategoryRoutes from '../containers/CategoryRoutes';

import AchievementsPage from './AchievementsPage';

class CharacterPage extends Component {
  componentDidMount() {
    const { params, url } = this.props.match;
    this.props.setBaseUrl(url);
    this.props.setRegion(params.region);

    const { isFetched } = this.props;

    if (!isFetched) {
      this.props.fetchEverything(params);
    }
  }

  render() {
    const {
      characterInfo,
      match,
    } = this.props;
    return (
      <div className="mt-3">
        <CharacterCard {...characterInfo} />
        <hr />
        <Row>
          <Col xs={12}>
            <h2>{match.params.category}</h2>
            <Route path={`${match.url}/achievements/`} exact component={AchievementsPage} />
            <CategoryRoutes />
          </Col>
          <Col xs={12}>
            <RecentAchievements />
          </Col>
        </Row>
      </div>
    );
  }
}

CharacterPage.defaultProps = {
  characterInfo: null,
  isFetched: false,
  match: {},
};

CharacterPage.propTypes = {
  characterInfo: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  fetchEverything: PropTypes.func.isRequired,
  isFetched: PropTypes.bool,
  setBaseUrl: PropTypes.func.isRequired,
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
    setBaseUrl,
    setRegion,
    fetchEverything,
  },
)(CharacterPage);