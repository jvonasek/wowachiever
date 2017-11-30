import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { getCharacterInfo } from '../reducers';

import CharacterCard from '../components/CharacterCard';
import SearchField from './SearchField';

const Header = ({ characterInfo }) => (
  <div className="my-3">
    <Row>
      <Col>
        <CharacterCard {...characterInfo} />
      </Col>
      <Col>
        <div className="mt-3">
          <Row>
            <Col sm={8}>
              <SearchField />
            </Col>
            <Col sm={4}>
              <Link to="/" className="btn btn-secondary btn-block">Change character</Link>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

Header.defaultProps = {
  characterInfo: null,
};

Header.propTypes = {
  characterInfo: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
  characterInfo: getCharacterInfo(state),
});

export default connect(mapStateToProps)(Header);
