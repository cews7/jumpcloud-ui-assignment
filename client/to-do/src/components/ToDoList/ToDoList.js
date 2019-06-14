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

  handleCreateToDoClick(event) {
    event.preventDefault();
    const newItem = { description: '', done: false, id: this.state.items.length + 1 }
    this.setState({
      items: [...this.state.items, newItem]
    })
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
      return item
    });
  }

  handleDoneClick = async(item, event) => {
    event.preventDefault();
    item.done ? item.done = false : item.done = true

    await this.setState({
      currentItem: item
    });

    this.state.items.map(item => {
      if (item.id === this.state.currentItem.id) {
          item.done = this.state.currentItem.done
        }
        return item;
    });

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

  handleSaveBlur = (item) => {
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
                onChange={this.handleChange.bind(this, item)} onBlur={this.handleSaveBlur.bind(this, item)} />
                { item.description !== '' ?
                  <button type="submit" className="btn btn-primary mb-2" onClick={this.handleDoneClick.bind(this, item)}>
                    { item.done ? 'Done' : 'Not Done' }
                  </button> :
                  <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSaveClick.bind(this, item)}>
                    Save
                  </button> }
              </div>
            )}
          </form>
          <button type="submit" className="btn btn-success" onClick={this.handleCreateToDoClick.bind(this)}>Create To Do</button>
        </div>
      </>
    );
  }
}
