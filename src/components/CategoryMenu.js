// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

import type { Category } from '../types';

type Props = {
  fullGroupUrl: string,
  categoryMenuItems: Array<Category>,
};

const CategoryMenu = ({ categoryMenuItems, fullGroupUrl }: Props) => (
  <ul className="list-group">
    {categoryMenuItems.map(({
      id,
      slug,
      name,
      completedAchievements,
      achievements,
      isLegacy,
    }) => (
      <li className="list-group-item" key={id} sm={3}>
        <NavLink
          to={`${fullGroupUrl}/${slug}`}
          className="d-block"
          activeClassName="font-weight-bold"
        >
          {name}
          <span className="float-right">
            {isLegacy
              ? completedAchievements.length
              : `${completedAchievements.length}/${achievements.length}`
            }
          </span>
        </NavLink>
      </li>
    ))}
  </ul>
);

CategoryMenu.defaultProps = {
  categoryMenuItems: [],
};

export default CategoryMenu;
