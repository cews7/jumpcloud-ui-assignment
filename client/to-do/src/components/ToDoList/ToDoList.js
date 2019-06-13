import React, { Component } from 'react';
import './ToDoList.css';

const API = 'http://localhost:8004/api/todos';

export default class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
  }

  handleCreateToDo(event) {
    event.preventDefault();
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <h2 className='todo-header'>To Dos This Week</h2>
        <div className='center-list'>
          <ul className='list-group'>
            {items.map(item =>
              <li className='list-group-item' key={item.id}>
                {item.description}
              </li>
            )}
          </ul>
          <button type="button" className="btn btn-success" onClick={this.handleCreateToDo}>Create To Do</button>
        </div>
      </>
    );
  }
}
