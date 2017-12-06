import React, { Component } from 'react';
import {
  ButtonGroup,
  Button,
} from 'reactstrap';

import type { FilterToggle } from '../types';

type Props = {
  toggles: Array<FilterToggle>,
  value: mixed,
  onChange: (value: mixed) => void,
};

type OwnState = {
  value: mixed,
};

class ButtonToggles extends Component<Props, OwnState> {
  state = { value: null }

  componentWillMount() {
    this.setState({
      value: this.props.value,
    });
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({
        value,
      });
    }
  }

  onButtonClick = (value) => {
    if (value === this.state.value) {
      this.handleChange(null);
    } else {
      this.handleChange(value);
    }
  }

  handleChange = (value) => {
    this.setState({ value }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    const { toggles } = this.props;
    return (
      <ButtonGroup>
        {toggles.map((toggle) => (
          <Button
            key={toggle.value}
            onClick={() => this.onButtonClick(toggle.value)}
            active={this.state.value === toggle.value}
          >
            {toggle.title}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default ButtonToggles;
