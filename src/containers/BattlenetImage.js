// @flow
import React from 'react';
import { connect, type Connector } from 'react-redux';

import { getRegion } from '../reducers';

import type { State, Region } from '../types';

type OwnProps = {
  alt: string,
  resourcePath: string,
};

type StateProps = {
  region: Region,
};

type Props = OwnProps & StateProps;

const BattlenetImage = ({
  alt,
  region,
  resourcePath,
  ...rest
}: Props) => (
  <img
    src={`https://render-${region}.worldofwarcraft.com/${resourcePath}`}
    alt={alt}
    {...rest}
  />
);

const mapStateToProps = (state: State) => ({
  region: getRegion(state),
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, {});

export default connector(BattlenetImage);
