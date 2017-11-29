import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Container } from 'reactstrap';

import App from '../components/App';
import ScrollToTop from '../components/ScrollToTop';
import Loader from '../components/Loader';

import RequestErrors from '../components/RequestErrors';

import { getIsLoading, getRequestErrors } from '../reducers';

import history from '../store/history';

const Root = ({ isLoading, requestErrors }) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <Container>
        <RequestErrors errors={requestErrors} />
        <App />
        {isLoading && <Loader />}
      </Container>
    </ScrollToTop>
  </ConnectedRouter>
);

Root.defaultProps = {
  isLoading: false,
  requestErrors: [],
};

Root.propTypes = {
  isLoading: PropTypes.bool,
  requestErrors: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  requestErrors: getRequestErrors(state),
});

export default connect(mapStateToProps)(Root);
