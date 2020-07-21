import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import TestA from './components/TestA'
import TestB from './components/TestB'

function App() {
  return (
    <div className="App">

      <BrowserRouter basename='h5'>
        <Link to='/testa'>testaaa</Link> |
        <Link to='/testb'>testbbb</Link>
        <Switch>
          <Route path='/testa' component={TestA} exact></Route>
          <Route path='/testb' component={TestB} exact></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
