import React, { Component } from 'react';
import './ToDoList.css';

const API = 'http://localhost:8004/api/todos';

export default class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {},
      isSave: false,
      newToDo: ''
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
  }

  handleChange = async(item, event) => {
    item.description = event.target.value;

    await this.setState({ currentItem: item });

    this.state.items.map(item => {
      if (item.id === this.state.currentItem.id) {
        item.description = this.state.currentItem.description;
      }
      return item;
    });
  }

  handleDoneClick = async(item) => {
      item.done ? item.done = false : item.done = true

      await this.setState({ currentItem: item });

      this.state.items.map(item => {
        if (item.id === this.state.currentItem.id) {
          item.done = this.state.currentItem.done;
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

  handleDeleteClick = async(item, event) => {
    event.preventDefault();
    this.deleteToDo(item);
  }

  handleUpdateBlur = (item) => {
    if (item.description) {
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
      this.deleteToDo(item);
    }
  }

  handleCreateToDoClick = async() => {
    await this.setState({
      isSave: true,
      newToDo: ''
    });
    document.getElementById('toDoInput').focus();
  }

  updateNewToDo = (event) => {
    this.setState({ newToDo: event.target.value });
  }

  handleSaveClick = () => {
    if (this.state.newToDo) {
      fetch(API, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: this.state.newToDo
        })
      }).then(response => response.json())
        .then(data => this.addData(data));

      this.setState({ isSave: false });
    } else {
      alert('Cannot save an empty To-Do!')
    }
  }

  handleCancelClick = () => {
    this.setState({ isSave: false });
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      document.getElementById('saveToDoButton').click();
    }
  }

  addData = (item) => {
    let items = this.state.items;
    items.push(item)
    this.setState({ items: items });
  }

  deleteToDo = async(item) => {
    await this.setState({ currentItem: item });

    this.state.items.map(item => {
      if (item.id === this.state.currentItem.id) {
        this.state.items.splice(this.state.items.indexOf(item), 1)
      }
      return item;
    });

    this.setState({ items: this.state.items });

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
      <div>
        <h2 className='todo-header'>To-Dos This Week</h2>
        <div className='center-list grey-bg todo-list'>
          <form className='form'>
            {items.map(item =>
              <div className='mb-2' key={item.id}>
                <input type="checkbox" defaultChecked={item.done} className="done-delete-position" onClick={this.handleDoneClick.bind(this, item)} />
                <input type='text' className='form-control-plaintext todo-description-width' value={item.description}
                onChange={this.handleChange.bind(this, item)} onBlur={this.handleUpdateBlur.bind(this, item)} />
                <i className='fas fa-trash' onClick={this.handleDeleteClick.bind(this, item)}></i>
              </div>
            )}
          </form>
          { this.state.isSave ?
            <>
             <input type='text' autoComplete='off' autoFocus={true} onKeyDown={this.handleEnter} id='toDoInput' placeholder='add to-do here...'
             className='form-control-plaintext todo-description-width save-cancel-bottom' onChange={this.updateNewToDo} value={this.state.newToDo.value} />
             <button type="submit" id='saveToDoButton' className="btn btn-success input-and-create-position" onClick={this.handleSaveClick}>Save</button>
             <button type="submit" className="btn btn-info" onClick={this.handleCancelClick}>Cancel</button>
            </> :
            <button type="submit" className="btn btn-success" onClick={this.handleCreateToDoClick}>Create To Do</button>
          }
        </div>
      </div>
    );
  }
}
