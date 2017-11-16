import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMenuItems } from '../reducers';

import ProgressBar from '../components/ProgressBar';

const Menu = ({ menuItems }) => (
  <div>
    {menuItems.map((group) => (
      <div key={group.id} className="mt-4">
        <h3>
          <span>{group.name}</span>
          <span className="badge badge-primary badge-pill float-right">
            {group.categories.reduce((acc, curr) => acc + curr.progress.current, 0)}
            {' / '}
            {group.categories.reduce((acc, curr) => acc + curr.progress.max, 0)}
          </span>
        </h3>
        <hr />

        <ul className="list-group">
          {group.categories.map(({
            id,
            url,
            name,
            progress,
          }) => (
            <li key={id} className="list-group-item">
              <Link to={`/${url}`}>{name}</Link>
              <span className="badge badge-primary badge-pill float-right">{progress.current} / {progress.max}</span>
              <ProgressBar current={progress.current} max={progress.max} height={2} />
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

Menu.defaultProps = {
  menuItems: [],
};

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  menuItems: getMenuItems(state),
});

export default connect(mapStateToProps)(Menu);
