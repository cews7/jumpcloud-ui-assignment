import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ToDoList from '../ToDoList/ToDoList';

class App extends Component {
  render() {
    return (
      <>
        <Route exact path='/' render={(props) => <ToDoList />} />
      </>
    );
  }
}

export default App;
