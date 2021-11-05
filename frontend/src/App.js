import React from "react";
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);

    this.state = {
      items: []
    };
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/todo-items');
    const data = await response.json();

    this.setState({
      items: data.list
    });
  }

  async handleAddItem(text) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ description: text })
    };

    const response = await fetch('http://localhost:3000/todo-items', requestOptions);
    const data = await response.json();
  
    const newTodoItems = this.state.items;

    newTodoItems.unshift(data);
    this.setState({
      items: newTodoItems
    });
  }

  async handleRemoveItem(id) {
    const requestOptions = {
      method: 'DELETE'
    }

    await fetch(`http://localhost:3000/todo-items/${id}`, requestOptions);

    const newTodoItems = this.state.items;
    const itemToBeDeleted = newTodoItems.find((item) => item._id === id);
    const indexToBeDeleted = newTodoItems.indexOf(itemToBeDeleted);

    newTodoItems.splice(indexToBeDeleted, 1);
    this.setState({
      items: newTodoItems
    });
  }

  async handleMarkDone(id) {
    const newTodoItems = this.state.items;
    const itemToBeUpdated = newTodoItems.find((item) => item._id === id);

    let newStatus;

    if(itemToBeUpdated.status === 'pending') {
      newStatus = 'progress';
    } else if(itemToBeUpdated.status === 'progress') {
      newStatus = 'done';
    } else if(itemToBeUpdated.status === 'done') {
      newStatus = 'pending';
    }

    itemToBeUpdated.status = newStatus;

    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }

    await fetch(`http://localhost:3000/todo-items/${id}/update-status`, requestOptions)

    this.setState({
      items: newTodoItems
    });
  }

  async handleEditItem(id, newDescription) {
    const newTodoItems = this.state.items;
    const itemToBeUpdated = newTodoItems.find((item) => item._id === id);

    itemToBeUpdated.description = newDescription;

    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newDescription })
    };

    await fetch(`http://localhost:3000/todo-items/${id}/update-description`, requestOptions)

    this.setState({
      items: newTodoItems
    });
  }

  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList
          items={this.state.items}
          removeItemFn={this.handleRemoveItem}
          markTodoDoneFn={this.handleMarkDone}
          editItemFn={this.handleEditItem}
        />
        <TodoForm
          addItemFn={this.handleAddItem}
        />
      </div>
    );
  }
}

export default TodoApp;
