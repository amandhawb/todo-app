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

    newTodoItems.splice(indexToBeDeleted);
    this.setState({
      items: newTodoItems
    });
  }

  handleMarkDone(id) {
    console.log('id mark donoe ---> ', id)
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

  itemToBeUpdated.status = newStatus

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
        />
        <TodoForm
          addItemFn={this.handleAddItem}
        />
      </div>
    );
  }
}

export default TodoApp;
