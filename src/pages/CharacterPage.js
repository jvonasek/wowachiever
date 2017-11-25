import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {
  Row,
  Col,
} from 'reactstrap';

import {
  getVisibleAchievements,
  getCharacterInfo,
} from '../reducers';

import {
  fetchCharacter,
  setBaseUrl,
  setRegion,
} from '../actions';

import CharacterCard from '../components/CharacterCard';
import RecentAchievements from '../containers/RecentAchievements';

import CategoryPage from './CategoryPage';
import AchievementsPage from './AchievementsPage';

class CharacterPage extends Component {
  componentDidMount() {
    const { params, url } = this.props.match;
    this.props.fetchCharacter(params);
    this.props.setBaseUrl(url);
    this.props.setRegion(params.region);
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
  achievements: [],
  characterInfo: null,
  match: {},
};

CharacterPage.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  characterInfo: PropTypes.objectOf(PropTypes.any),
  fetchCharacter: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any),
  setBaseUrl: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  achievements: getVisibleAchievements(state, props),
  characterInfo: getCharacterInfo(state),
});

export default connect(
  mapStateToProps,
  { fetchCharacter, setBaseUrl, setRegion },
)(CharacterPage);
