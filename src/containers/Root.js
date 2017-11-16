import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../components/App';
import ScrollToTop from '../components/ScrollToTop';

import {
  importCategories,
  importRealms,
} from '../actions';

import achievementData from '../data/achievements.json';
import realmsData from '../data/realms.json';

class Root extends Component {
  componentWillMount() {
    this.props.importCategories(achievementData);
    this.props.importRealms(realmsData);
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
  importCategories: PropTypes.func.isRequired,
  importRealms: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    importCategories,
    importRealms,
  },
)(Root);
