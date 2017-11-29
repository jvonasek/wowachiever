import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CharacterPage from '../pages/CharacterPage';
import CharacterSelectPage from '../pages/CharacterSelectPage';
import NotFound from '../pages/NotFound';

const App = () => (
  <Switch>
    <Route path="/" exact component={CharacterSelectPage} />
    <Route path="/:region/:realm/:character" component={CharacterPage} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
