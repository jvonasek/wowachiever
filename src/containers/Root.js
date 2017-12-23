// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/App';
import ScrollToTop from '../components/ScrollToTop';
import Loader from '../components/Loader';

import RequestErrors from '../components/RequestErrors';

import { getIsLoading, getRequestErrors } from '../reducers';

import history from '../store/history';

import type { State } from '../types';

type StateProps = {
  isLoading: boolean,
  requestErrors: Array<string>,
}

type Props = StateProps;

const Root = ({ isLoading, requestErrors }: Props) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <div className="page-wrapper">
        <RequestErrors errors={requestErrors} />
        {isLoading ? <Loader /> : <App />}
      </div>
    </ScrollToTop>
  </ConnectedRouter>
);

Root.defaultProps = {
  isLoading: false,
  requestErrors: [],
};

const mapStateToProps = (state: State) => ({
  isLoading: getIsLoading(state),
  requestErrors: getRequestErrors(state),
});

const connector: Connector<{}, Props> = connect(mapStateToProps);

export default connector(Root);
