import React from 'react';
import {
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

import CharacterSelectForm from '../containers/CharacterSelectForm';

const CharacterSelectPage = () => (
  <Row className="justify-content-center">
    <Col sm={6}>
      <Jumbotron className="my-3">
        <h1 className="display-4 text-center">WoWACHIEVER</h1>
        <CharacterSelectForm onSubmit={() => {}} />
      </Jumbotron>
    </Col>
  </Row>
);

export default CharacterSelectPage;
