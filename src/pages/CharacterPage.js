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
} from '../reducers';

import {
  fetchCharacter,
  setBaseUrl,
  setRegion,
  fetchAchievementsAndCriteria,
  hydrateAchievements,
} from '../actions';

import CharacterCard from '../components/CharacterCard';
import RecentAchievements from '../containers/RecentAchievements';

import CategoryPage from './CategoryPage';
import AchievementsPage from './AchievementsPage';

class CharacterPage extends Component {
  componentDidMount() {
    const { params, url } = this.props.match;
    this.props.setBaseUrl(url);
    this.props.setRegion(params.region);
    this.props.fetchCharacter(params)
      .then(() => this.props.fetchAchievementsAndCriteria())
      .then(() => this.props.hydrateAchievements(
        this.props.completedAchievements,
        this.props.characterCriteria,
      ));
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
            <Route path={`${match.url}/achievements/:group/:category?`} component={CategoryPage} />
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
  characterCriteria: {},
  characterInfo: null,
  completedAchievements: {},
  match: {},
};

CharacterPage.propTypes = {
  characterCriteria: PropTypes.objectOf(PropTypes.object),
  characterInfo: PropTypes.objectOf(PropTypes.any),
  completedAchievements: PropTypes.objectOf(PropTypes.object),
  match: PropTypes.objectOf(PropTypes.any),
  fetchCharacter: PropTypes.func.isRequired,
  setBaseUrl: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  fetchAchievementsAndCriteria: PropTypes.func.isRequired,
  hydrateAchievements: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  characterCriteria: getCharacterCriteria(state),
  characterInfo: getCharacterInfo(state),
  completedAchievements: getCompletedAchievements(state),
});

export default connect(
  mapStateToProps,
  {
    fetchCharacter,
    setBaseUrl,
    setRegion,
    fetchAchievementsAndCriteria,
    hydrateAchievements,
  },
)(CharacterPage);
