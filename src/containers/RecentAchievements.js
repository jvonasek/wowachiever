import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';

import { getRecentAchievements } from '../reducers';

import Achievement from '../components/Achievement';

const RecentAchievements = ({ recentAchievements }) => {
  if (!recentAchievements.length) {
    return null;
  }

  return (
    <div>
      <Row>
        <Col>
          <h2>Recent achievements</h2>
        </Col>
      </Row>
      <Row>
        {recentAchievements.map((ach) => <Achievement key={ach.id} {...ach} />)}
      </Row>
    </div>
  );
};

RecentAchievements.defaultProps = {
  recentAchievements: [],
};

RecentAchievements.propTypes = {
  recentAchievements: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  recentAchievements: getRecentAchievements(state),
});

export default connect(mapStateToProps)(RecentAchievements);
