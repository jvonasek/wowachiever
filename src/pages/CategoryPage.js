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
  getBaseUrl,
  getCurrentCategory,
} from '../reducers';

import { getTotalPropertyLength } from '../utils';

import AchievementList from '../components/AchievementList';
import CategoryMenu from '../components/CategoryMenu';
import ProgressBar from '../components/ProgressBar';

const CategoryPage = ({
  achievements,
  categoryMenuProps,
  currentCategory,
}) => (
  <Row>
    <Col xs={12}>
      <h2 className="mb-4">{currentCategory.name}</h2>
    </Col>
    <Col sm={3}>
      <ProgressBar
        className="mb-2"
        value={getTotalPropertyLength(categoryMenuProps.categoryMenuItems, 'completedAchievements')}
        max={getTotalPropertyLength(categoryMenuProps.categoryMenuItems, 'achievements')}
      />
      <Link
        className="btn btn-secondary btn-block mb-2"
        to={`${categoryMenuProps.baseUrl}/achievements`}
      >
        Back to overview
      </Link>
      <CategoryMenu {...categoryMenuProps} />
    </Col>
    <Col sm={9}>
      <AchievementList achievements={achievements} />
    </Col>
  </Row>
);

CategoryPage.defaultProps = {
  achievements: [],
};

CategoryPage.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  categoryMenuProps: PropTypes.shape({
    categoryMenuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    baseUrl: PropTypes.string.isRequired,
  }).isRequired,
  currentCategory: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, props) => ({
  achievements: getVisibleAchievements(state, props),
  currentCategory: getCurrentCategory(state, props),
  categoryMenuProps: {
    categoryMenuItems: getCategoryMenuItems(state, props),
    baseUrl: getBaseUrl(state),
  },
});

export default connect(mapStateToProps)(CategoryPage);
