import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRoutes } from '../reducers';

import CategoryPage from '../pages/CategoryPage';

const CategoryRoutes = ({ routes, match: { url } }) => {
  const routeKeys = Object.keys(routes);
  return routeKeys.length > 0 && (
    <Switch>
      {routeKeys.map((route) => (
        <Route
          key={routes[route]}
          path={`${url}/achievements${route}`}
          render={() => <CategoryPage catId={routes[route]} />}
        />))
      }
      <Route
        path={`${url}/achievements/*`}
        render={() => (
          <div className="mb-5">
            <h2>Category not found</h2>
            <Link to={`${url}/achievements/`}>Achievements overview</Link>
          </div>
        )}
      />
    </Switch>
  );
};

CategoryRoutes.defaultProps = {
  routes: {},
};

CategoryRoutes.propTypes = {
  routes: PropTypes.objectOf(PropTypes.number),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  routes: getRoutes(state),
});

export default withRouter(connect(mapStateToProps)(CategoryRoutes));
