import React from 'react';
import defer from 'lodash/defer';

import { refreshWowheadLinks } from '../utils';

const withWowhead = (WrappedComponent) =>
  class WowheadWrapper extends React.PureComponent {
    componentDidMount() {
      defer(refreshWowheadLinks);
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };


export default withWowhead;
