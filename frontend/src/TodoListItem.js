import React from "react";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickMarkDone = this.handleClickMarkDone.bind(this);
  };

  handleClickDelete() {
    this.props.removeItemFn(this.props.id);
  }

  handleClickMarkDone() {
    this.props.markTodoDoneFn(this.props.id);
  }

  render() {
    let itemCssClassName;

    if(this.props.status === 'pending') {
      itemCssClassName = 'pending';
    } else if(this.props.status === 'progress') {
      itemCssClassName = 'in-progress';
    } else if(this.props.status === 'done') {
      itemCssClassName = 'done';
    }

    return (
      <li className="list-group-item">
        <div className={itemCssClassName}>
          <span
            className="glyphicon glyphicon-ok icon"
            onClick={this.handleClickMarkDone}>
          </span>
          {this.props.description}
          <button
            type="button"
            className="close"
            onClick={this.handleClickDelete}
          >
            &times;
          </button>
        </div>
      </li>
    );
  }
}

export default TodoListItem;