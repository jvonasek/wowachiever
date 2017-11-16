import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';

import { getVisibleAchievements } from '../reducers';

import Achievement from '../components/Achievement';

const Content = ({ match, achievements }) => (
  <div>
    <Row>
      <Col xs={12}>
        <h2>{match.params.category}</h2>
      </Col>
    </Row>
    <Row>
      {achievements.map((ach) => (<Achievement key={ach.id} {...ach} />))}
    </Row>
  </div>
);

Content.defaultProps = {
  achievements: [],
  match: {},
};

Content.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state, props) => ({
  achievements: getVisibleAchievements(state, props),
});

export default connect(mapStateToProps)(Content);
