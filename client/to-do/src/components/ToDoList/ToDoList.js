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

  render() {
    const { items } = this.state;
    return (
      <>
        <ul className='list-group'>
          {items.map(item =>
            <li className='list-group-item' key={item.id}>
              {item.description}
            </li>
          )}
        </ul>
      </>
    );
  }
}
