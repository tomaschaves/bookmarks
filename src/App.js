import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookCovers from './components/BookCovers';
import Quotes from './components/Quotes';

export default class App extends Component {
  render () {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/:id" render={ (props) => <Quotes { ...props } /> } />
          <Route exact path="/" component={ BookCovers } />
        </Switch>
      </BrowserRouter>
    )
  }
}
