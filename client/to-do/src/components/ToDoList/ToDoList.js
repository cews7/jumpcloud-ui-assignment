import React, { Component } from 'react';
import './ToDoList.css';

const API = 'http://localhost:8004/api/todos';

export default class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {},
      isSave: false
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
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
    debugger;
    event.preventDefault();
    if (item.description) {
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
    } else {
      alert('Cannot mark as done or not done without description!')
    }
  }

  handleSaveBlur = (item) => {
    if (item.newItem) {
      return item;
    } else {
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
  }

  handleCreateToDoClick = async(event) => {
    await this.setState({
      isSave: true
    });

    let newItem = { description: '', done: false, id: new Date().getTime(), newItem: true }
    this.setState({
      items: [...this.state.items, newItem]
    })
  }

  handleSaveClick = () => {
    let newItemDescription = this.state.items.slice(-1).pop().description;
    if (newItemDescription) {
      fetch(API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: newItemDescription
        })
      }).then(response => response.json());
      this.setState({
        isSave: false
      });
    } else {
      alert('Cannot Save an empty To Do!')
    }
  }

  handleDeleteClick = async(item, event) => {
    event.preventDefault();

    await this.setState({
      currentItem: item
    });

    this.state.items.map(item => {
      if (item.id === this.state.currentItem.id) {
        this.state.items.splice(this.state.items.indexOf(item), 1)
      }
    });

    this.setState({
      items: this.state.items
    });

    fetch(API + '/' + item.id, {
      method: 'DELETE',
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
                <button type="submit" className="btn btn-primary" onClick={this.handleDoneClick.bind(this, item)}>
                  { item.done ? 'Done' : 'Not Done' }
                </button>
                <button type="button" className="btn btn-danger" onClick={this.handleDeleteClick.bind(this, item)}>Delete</button>
              </div>
            )}
          </form>
          { this.state.isSave ?
            <button type="submit" className="btn btn-success" onClick={this.handleSaveClick}>Save</button> :
            <button type="submit" className="btn btn-success" onClick={this.handleCreateToDoClick}>Create To Do</button>
          }
        </div>
      </>
    );
  }
}
