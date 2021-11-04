import React from "react";
import TodoListItem from "./TodoListItem";

class TodoList extends React.Component {
  render() {
    const { items } = this.props;

    const todoListItems = items.map((item, index) => {
      return <TodoListItem
        key={item._id}
        _id={item._id}
        text={item.text}
        status={item.status}
        removeItemFn = { this.props.removeItemFn }
        markTodoDoneFn = { this.props.markTodoDoneFn }
      />
    });

    return <ul className="list-group">{todoListItems}</ul>;
  }
}

export default TodoList;
