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
  getViewTypeValue,
} from '../reducers';

import { getTotalPropertyLength } from '../utils';

import AchievementList from '../components/AchievementList';
import CategoryMenu from '../components/CategoryMenu';
import ProgressBar from '../components/ProgressBar';
import Filter from '../containers/Filter';
import Sorter from '../containers/Sorter';
import ViewSwitcher from '../containers/ViewSwitcher';

import withWowhead from '../hocs/withWowhead';

import type {
  State,
  Achievement,
  Category,
  Group,
  ViewTypes,
} from '../types';

type StateProps = {
  achievements: Array<Achievement>,
  categoryMenuItems: Array<Object>,
  characterUrl: string,
  currentCategory: Category,
  currentGroup: Group,
  viewType: ViewTypes,
};

type Props = StateProps;

const CategoryPage = ({
  achievements,
  categoryMenuItems,
  characterUrl,
  currentCategory,
  currentGroup,
  viewType,
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
      <Row>
        <Col>
          <Filter />
        </Col>
      </Row>
      <Row>
        <Col>
          <ViewSwitcher />
        </Col>
        <Col>
          <Sorter />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Showing {achievements.length} out of {currentCategory.achievements.length} achievements
          </p>
        </Col>
      </Row>
      <AchievementList achievements={achievements} viewType={viewType} />
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
  viewType: getViewTypeValue(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(withWowhead(CategoryPage));
