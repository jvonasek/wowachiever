import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import flowRight from 'lodash/fp/flowRight';

import { getGroupMenuItems } from '../reducers';

import GroupMenu from '../components/GroupMenu';

const mapStateToProps = (state) => ({
  groupMenuItems: getGroupMenuItems(state),
});

export default flowRight(
  withRouter,
  connect(mapStateToProps),
)(GroupMenu);
