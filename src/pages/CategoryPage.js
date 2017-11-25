import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import flowRight from 'lodash/fp/flowRight';
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

import AchievementList from '../components/AchievementList';
import CategoryMenu from '../components/CategoryMenu';

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
      <Link
        className="btn btn-primary btn-block mb-3"
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

export default flowRight(
  withRouter,
  connect(mapStateToProps),
)(CategoryPage);
