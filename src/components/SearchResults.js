import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import BattlenetImage from '../containers/BattlenetImage';

const SearchResults = ({ results, visible }) => {
  if (!results.length || !visible) {
    return null;
  }

  return (
    <div className="search-results">
      {results.map(({
        id,
        icon,
        title,
        completed,
      }) => (
        <Link to="/" key={id} className="serach-results-item d-block">
          <BattlenetImage
            width={20}
            height={20}
            className={classnames({
              rounded: true,
              'mr-2': true,
              border: true,
              'border-secondary': !completed,
              'border-success': completed,
            })}
            alt={title}
            resourcePath={`icons/56/${icon}.jpg`}
          />
          <span className="text-truncate">{title}</span>
        </Link>
      ))}
    </div>
  );
};

SearchResults.defaultProps = {
  results: [],
  visible: false,
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool,
};

export default SearchResults;
