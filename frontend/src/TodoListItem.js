import React from "react";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickMarkDone = this.handleClickMarkDone.bind(this);
    this.handleEditItemState = this.handleEditItemState.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      isEditing: false,
      newDescription: this.props.description,
    };
  };

  handleClickDelete() {
    this.props.removeItemFn(this.props.id);
  }

  handleClickMarkDone() {
    this.props.markTodoDoneFn(this.props.id);
  }

  handleEditItemState() {
    this.setState({
      isEditing: true
    });
  }

  handleOnChange(event) {
    this.setState({
      newDescription: event.target.value
    })
  }

  handleEditItem() {
    const { id } = this.props;
    const { newDescription } = this.state;
    this.props.editItemFn(id, newDescription)

    this.setState({
      isEditing: false
    })
  }

  render() {
    if(this.state.isEditing) {
      return (
        <li className="list-group-item">
          <div>
            <input
              type="text"
              value={this.state.newDescription}
              onChange={this.handleOnChange}
            />
            <span
              className="glyphicon glyphicon-floppy-disk"
              onClick={this.handleEditItem}
            >
            </span>
          </div>
        </li>
      )
    }
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
          <span
            className="glyphicon glyphicon-pencil pencil"
            onClick={this.handleEditItemState}
          >
          </span>
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