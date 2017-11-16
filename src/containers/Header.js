import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';

import { getCharacter } from '../reducers';
import { fetchCharacter } from '../actions';

import CharacterCard from '../components/CharacterCard';
import CharacterSelectForm from './CharacterSelectForm';

const Header = ({ character, handleCharacterFormSubmit }) => (
  <Row>
    <Col xs={12}>
      <div className="jumbotron mt-3 py-4">
        <h1 className="display-3">WoWACHIEVER</h1>
        <hr className="my-4" />
        <Row>
          <Col md={4}>
            {character
              ? <CharacterCard {...character} />
              : <CharacterSelectForm onSubmit={handleCharacterFormSubmit} />
            }
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
);

Header.defaultProps = {
  character: null,
  handleCharacterFormSubmit: () => {},
};

Header.propTypes = {
  character: PropTypes.objectOf(PropTypes.any),
  handleCharacterFormSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
  character: getCharacter(state),
});

export default connect(
  mapStateToProps,
  { handleCharacterFormSubmit: fetchCharacter },
)(Header);
