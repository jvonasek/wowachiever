import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import CharacterPage from '../pages/CharacterPage';
import CharacterSelectPage from '../pages/CharacterSelectPage';
import NotFound from '../pages/NotFound';

const App = () => (
  <Container>
    <Switch>
      <Route path="/" exact component={CharacterSelectPage} />
      <Route path="/:region/:realm/:character" component={CharacterPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Container>
);

export default App;
