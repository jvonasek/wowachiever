import React from 'react';
import { Route } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Header from '../containers/Header';
import Menu from '../containers/Menu';
import Content from '../containers/Content';
import RecentAchievements from '../containers/RecentAchievements';

const App = () => (
  <Container fluid>
    <Header />
    <RecentAchievements />
    <Row>
      <Col sm={3}>
        <Menu />
      </Col>
      <Col sm={9}>
        <Route path="/:group/:category?" component={Content} />
      </Col>
    </Row>
  </Container>
);

export default App;
