import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { searchAchievements } from '../actions';
import { getAchievementsSearchResult } from '../reducers';

import SearchResults from '../components/SearchResults';

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      resultsVisible: false,
    };

    this.debouncedSearch = debounce(this.props.searchAchievements, 250);
  }

  showResults = (state = true) => {
    this.setState({
      ...this.state,
      resultsVisible: state,
    });
  }

  handleFocus = () => {
    this.showResults();
  }

  handleBlur = () => {
    this.showResults(false);
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      value,
    }, () => {
      if (value.length >= 3) {
        this.debouncedSearch(value);
        this.showResults();
      } else {
        this.showResults(false);
      }
    });
  }

  render() {
    const { results } = this.props;
    return (
      <div className="search-field">
        <input
          className="form-control"
          type="text"
          placeholder="Search achievements..."
          value={this.state.value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <SearchResults results={results} visible={this.state.resultsVisible} />
      </div>
    );
  }
}
SearchField.defaultProps = {
  results: [],
};

SearchField.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  searchAchievements: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: getAchievementsSearchResult(state),
});

export default connect(
  mapStateToProps,
  { searchAchievements },
)(SearchField);
