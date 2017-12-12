import React, { Component } from 'react';
import classnames from 'classnames';
import {
  ButtonGroup,
  Button,
} from 'reactstrap';

import type { ToggleButton } from '../types';

type Props = {
  onChange: (value: mixed) => void,
  resetable: boolean,
  toggles: Array<ToggleButton>,
  value: mixed,
};

type OwnState = {
  value: mixed,
};

class ButtonToggles extends Component<Props, OwnState> {
  static defaultProps = {
    onChange: () => {},
    resetable: false,
    toggles: [],
    value: null,
  }

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
    if (value === this.state.value && this.props.resetable) {
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
      <ButtonGroup className="d-flex">
        {toggles.map((toggle) => (
          <Button
            key={toggle.value}
            className={classnames({
              'w-100': true,
              'btn-info': this.state.value === toggle.value,
            })}
            onClick={() => this.onButtonClick(toggle.value)}
          >
            {toggle.title}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default ButtonToggles;
