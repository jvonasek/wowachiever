import { connect } from 'react-redux';

import { getGroupMenuItems } from '../reducers';

import GroupMenu from '../components/GroupMenu';

const mapStateToProps = (state) => ({
  groupMenuItems: getGroupMenuItems(state),
});

export default connect(mapStateToProps)(GroupMenu);
