// @flow
import React, { Component } from 'react';
import { connect, type Connector } from 'react-redux';
import debounce from 'lodash/debounce';

import { searchAchievements } from '../actions';
import { getAchievementsSearchResult } from '../reducers';

import SearchResults from '../components/SearchResults';

import type { State } from '../types';

type StateProps = {
  results: Array<Object>,
}

type DispatchProps = {
  searchAchievements: () => void,
}

type Props = StateProps & DispatchProps;

type OwnState = {
  value: string,
  resultsVisible: boolean,
}

class SearchField extends Component<Props, OwnState> {
  static defaultProps = {
    results: [],
  }

  constructor(props: Props) {
    super(props);

    this.debouncedSearch = debounce(this.props.searchAchievements, 250);
  }

  state = {
    value: '',
    resultsVisible: false,
  }

  debouncedSearch: (value: string) => void

  showResults = (resultsState: boolean = true): void => {
    this.setState({
      ...this.state,
      resultsVisible: resultsState,
    });
  }

  handleFocus = (): void => {
    this.showResults();
  }

  handleBlur = (): void => {
    this.showResults(false);
  }

  handleChange = (event: Event): void => {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      this.setState({
        ...this.state,
        value: target.value,
      }, () => {
        if (target.value.length >= 3) {
          this.debouncedSearch(target.value);
          this.showResults();
        } else {
          this.showResults(false);
        }
      });
    }
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

const mapStateToProps = (state: State) => ({
  results: getAchievementsSearchResult(state),
});

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  { searchAchievements },
);

export default connector(SearchField);
