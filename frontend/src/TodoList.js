import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  render() {
    const { items } = this.props;
    const todoListItems = items.map((item) => (<TodoListItem
      key={ item._id }
      id={ item._id }
      description={ item.description }
      status={ item.status }
      removeItemFn={ this.props.removeItemFn }
      markTodoDoneFn={ this.props.markTodoDoneFn }
      editItemFn={ this.props.editItemFn }
    />));

    return <ul className="list-group">{todoListItems}</ul>;
  }
}

export default TodoList;
