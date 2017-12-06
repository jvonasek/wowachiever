// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
} from 'reactstrap';

import {
  getFilteredAndSortedAchievements,
  getCategoryMenuItems,
  getCharacterUrl,
  getCurrentCategory,
  getCurrentGroup,
} from '../reducers';

import { getTotalPropertyLength } from '../utils';

import AchievementList from '../components/AchievementList';
import CategoryMenu from '../components/CategoryMenu';
import ProgressBar from '../components/ProgressBar';
import FilterSorter from '../containers/FilterSorter';

import type {
  State,
  Achievement,
  Category,
  Group,
} from '../types';

type StateProps = {
  achievements: Array<Achievement>,
  categoryMenuItems: Array<Object>,
  characterUrl: string,
  currentCategory: Category,
  currentGroup: Group,
};

type Props = StateProps;

const CategoryPage = ({
  achievements,
  categoryMenuItems,
  characterUrl,
  currentCategory,
  currentGroup,
}: Props) => (
  <Row>
    <Col xs={12}>
      <h2 className="mb-4">{currentGroup.name}{' / '}{currentCategory.name}</h2>
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
      <FilterSorter />
      <AchievementList achievements={achievements} />
    </Col>
  </Row>
);

CategoryPage.defaultProps = {
  achievements: [],
  categoryMenuItems: [],
};

const mapStateToProps = (state: State, props) => ({
  achievements: getFilteredAndSortedAchievements(state, props),
  categoryMenuItems: getCategoryMenuItems(state, props),
  characterUrl: getCharacterUrl(state),
  currentCategory: getCurrentCategory(state, props),
  currentGroup: getCurrentGroup(state, props),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(CategoryPage);
