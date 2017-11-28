import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../components/App';
import ScrollToTop from '../components/ScrollToTop';
import Loader from '../components/Loader';

import { fetchRealms } from '../actions';
import { getIsLoading } from '../reducers';


class Root extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRealms());
  }

  render() {
    const { isLoading } = this.props;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <App />
          {isLoading && <Loader />}
        </ScrollToTop>
      </Router>
    );
  }
}

Root.defaultProps = {
  isLoading: false,
};

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(Root);
