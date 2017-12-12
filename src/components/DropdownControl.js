// @flow
import React, { Component } from 'react';
import find from 'lodash/find';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import type { ControlButton } from '../types';

type OwnProps = {
  options: Array<ControlButton>,
  value: ?any,
  onChangeHandler: (value: any) => void,
}

type OwnState = {
  open: boolean,
  value: ?any,
  title: string,
};

type Props = OwnProps;

class DropdownControl extends Component<Props, OwnState> {
  static defaultProps = {
    options: [],
    value: null,
    onChangeHandler: () => {},
  }

  state = {
    open: false,
    value: null,
    title: 'Dropdown',
  }

  componentWillMount() {
    const activeOption = find(this.props.options, { value: this.props.value });
    this.setState({
      value: this.props.value,
      title: activeOption ? activeOption.title : this.state.title,
    });
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  handleClick = ({ title, value }: ControlButton): void => {
    this.setState({
      title,
      value,
    });
    this.props.onChangeHandler(value);
  }

  render() {
    const { options } = this.props;
    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle}>
        <DropdownToggle caret className="w-100">
          {this.state.title}
        </DropdownToggle>
        <DropdownMenu className="w-100">
          {options.map((o) => (
            <DropdownItem
              key={o.value}
              onClick={() => this.handleClick(o)}
              active={this.state.value === o.value}
            >
              {o.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownControl;
