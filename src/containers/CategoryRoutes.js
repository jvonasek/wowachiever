// @flow
import React from 'react';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { connect, type Connector } from 'react-redux';
import { getRoutes } from '../reducers';

import CategoryPage from '../pages/CategoryPage';

import type { State } from '../types';

type StateProps = {
  routes: Object,
  match: Object,
};

type Props = StateProps;

const CategoryRoutes = ({ routes, match: { url } }: Props) => {
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

const mapStateToProps = (state: State) => ({
  routes: getRoutes(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default withRouter(connector(CategoryRoutes));
