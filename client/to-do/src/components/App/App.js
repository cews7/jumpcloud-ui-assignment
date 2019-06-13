import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ToDoList from '../ToDoList/ToDoList';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <Route exact path='/' render={(props) => <ToDoList />} />
      </>
    );
  }
}

export default App;
