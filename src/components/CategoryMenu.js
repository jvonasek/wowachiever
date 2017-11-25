import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CategoryMenu = ({ categoryMenuItems, baseUrl }) => (
  <ul className="list-group">
    {categoryMenuItems.map(({
      id,
      url,
      name,
      completedAchievements,
      achievements,
      isLegacy,
    }) => (
      <li className="list-group-item" key={id} sm={3}>
        <NavLink
          to={`${baseUrl}/achievements/${url}`}
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
  baseUrl: '',
  categoryMenuItems: [],
  isLegacy: false,
};

CategoryMenu.propTypes = {
  baseUrl: PropTypes.string,
  categoryMenuItems: PropTypes.arrayOf(PropTypes.object),
  isLegacy: PropTypes.bool,
};

export default CategoryMenu;
