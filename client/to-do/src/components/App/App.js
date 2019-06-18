import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ToDoList from '../ToDoList/ToDoList';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={(props) => <ToDoList />} />
      </div>
    );
  }
}

export default App;
