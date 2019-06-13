import React, { Component } from 'react';
import './ToDoList.css';

const API = 'http://localhost:8004/api/todos';

export default class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {}
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

  handleChange = async(item, event) => {
    item.description = event.target.value

    await this.setState({
      currentItem: item
    });

    this.state.items.map(item => {
      if (item.id === this.state.currentItem.id) {
        item.description = this.state.currentItem.description
      }
    });
  }

  handleBlur = (item) => {
    fetch(API + '/' + item.id, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response;
    }).catch(error => error);
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <h2 className='todo-header'>To Dos This Week</h2>
        <div className='center-list'>
          <form className='form'>
            {items.map(item =>
              <div className='form-group mb-2' key={item.id}>
                <input type='text' className='form-control-plaintext center-list' value={item.description}
                onChange={this.handleChange.bind(this, item)} onBlur={this.handleBlur.bind(this, item)} />
                <button type="submit" className="btn btn-primary mb-2" onSubmit={this.handleIsDone}>
                  { item.done ? 'Done' : 'Not Done' }
                </button>
              </div>
            )}
          </form>
          <button type="submit" className="btn btn-success" onSubmit={this.handleCreateToDo}>Create To Do</button>
        </div>
      </>
    );
  }
}
