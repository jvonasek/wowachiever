// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  children: Node,
  location: Object,
};

class ScrollToTop extends Component<Props> {
  static defaultProps = {
    children: null,
    location: {},
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
