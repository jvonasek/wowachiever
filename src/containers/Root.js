import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../components/App';
import ScrollToTop from '../components/ScrollToTop';

import { fetchRealms } from '../actions';

class Root extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRealms());
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    );
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Root);
