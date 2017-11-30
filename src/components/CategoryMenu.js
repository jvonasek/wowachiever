import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CategoryMenu = ({ categoryMenuItems, fullGroupUrl }) => (
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
  isLegacy: false,
};

CategoryMenu.propTypes = {
  fullGroupUrl: PropTypes.string.isRequired,
  categoryMenuItems: PropTypes.arrayOf(PropTypes.object),
  isLegacy: PropTypes.bool,
};

export default CategoryMenu;
