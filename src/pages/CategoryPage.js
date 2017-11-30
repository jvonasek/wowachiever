import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
} from 'reactstrap';

import {
  getVisibleAchievements,
  getCategoryMenuItems,
  getCharacterUrl,
  getCurrentCategory,
  getCurrentGroup,
} from '../reducers';

import { getTotalPropertyLength } from '../utils';

import AchievementList from '../components/AchievementList';
import CategoryMenu from '../components/CategoryMenu';
import ProgressBar from '../components/ProgressBar';

const CategoryPage = ({
  achievements,
  categoryMenuItems,
  characterUrl,
  currentCategory,
  currentGroup,
}) => (
  <Row>
    <Col xs={12}>
      <h2 className="mb-4">{currentGroup.name} / {currentCategory.name}</h2>
    </Col>
    <Col sm={3}>
      <ProgressBar
        className="mb-2"
        value={getTotalPropertyLength(categoryMenuItems, 'completedAchievements')}
        max={getTotalPropertyLength(categoryMenuItems, 'achievements')}
      />
      <Link
        className="btn btn-secondary btn-block mb-2"
        to={`${characterUrl}/achievements`}
      >
        Back to overview
      </Link>
      <CategoryMenu
        categoryMenuItems={categoryMenuItems}
        fullGroupUrl={`${characterUrl}/achievements/${currentGroup.slug}`}
      />
    </Col>
    <Col sm={9}>
      <AchievementList achievements={achievements} />
    </Col>
  </Row>
);

CategoryPage.defaultProps = {
  achievements: [],
  categoryMenuItems: [],
};

CategoryPage.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  categoryMenuItems: PropTypes.arrayOf(PropTypes.object),
  characterUrl: PropTypes.string.isRequired,
  currentCategory: PropTypes.objectOf(PropTypes.any).isRequired,
  currentGroup: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, props) => ({
  achievements: getVisibleAchievements(state, props),
  categoryMenuItems: getCategoryMenuItems(state, props),
  characterUrl: getCharacterUrl(state),
  currentCategory: getCurrentCategory(state, props),
  currentGroup: getCurrentGroup(state, props),
});

export default connect(mapStateToProps)(CategoryPage);
