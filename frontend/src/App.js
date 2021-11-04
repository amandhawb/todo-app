import React from "react";
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleAddItem = this.handleAddItem.bind(this);
    // this.handleRemoveItem = this.handleRemoveItem.bind(this);
    // this.handleMarkDone = this.handleMarkDone.bind(this);

    this.state = {
      items: []
    };
  };

  componentDidMount() {
    // futuramente chamar backend (getAll) e atualizar o state

    const sampleItems = [
      {
        _id: 1,
        text: 'Item 1',
        status: 'DONE'
      },
      {
        _id: 2,
        text: 'Item 2',
        status: 'NOT_DONE'
      },
      {
        _id: 3,
        text: 'Item 3',
        status: 'DONE'
      }
    ];

    this.setState({
      items: sampleItems
    });

  }

  handleAddItem(text) {
    // futuramente chamar o backend (POST)
    console.log(`HandleAddItem ${text}`);

    // TEMPORARIO
    const responseBackEnd = {
      _id: Math.random(),
      text: text,
      status: 'UNDOONE'
    };
    const newTodoItems = this.state.items;

    newTodoItems.unshift(responseBackEnd);
    this.setState({
      items: newTodoItems
    });
  }

  // handleRemoveItem(id) {
  //   // futuramente chamar o backend (DELETE)
  //   console.log(`HandleRemoveItem ${id}`);

  //   //TEMPORARIO
  //   const newTodoItems = this.state.items;
  //   newTodoItems.splice(itemIndex, 1);

  //   this.setState({
  //     items: newTodoItems
  //   });
  // }

  // handleMarkDone(id) {
  //   // futuramente chamar o backend (POST) e recebe um novo status

  //   let todo = todoItems[itemIndex];

  //   todoItems.splice(itemIndex, 1);

  //   todo.done = !todo.done;

  //   todo.done ? todoItems.push(todo) : todoItems.unshift(todo);

  //   this.setState({
  //     todoItems: todoItems
  //   });
  // }

  render() {
    console.log('renderizou');
    console.log('ESSE E O STATE:', this.state.items)
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
