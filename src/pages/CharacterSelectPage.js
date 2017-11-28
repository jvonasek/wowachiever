import React from 'react';
import {
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

import CharacterSelectForm from '../containers/CharacterSelectForm';

const CharacterSelectPage = () => (
  <Row className="justify-content-center">
    <Col md={12} lg={6}>
      <Jumbotron className="my-5 py-5">
        <h1 className="display-5 text-center">WoWACHIEVER</h1>
        <CharacterSelectForm onSubmit={() => {}} />
      </Jumbotron>
    </Col>
  </Row>
);

export default CharacterSelectPage;
