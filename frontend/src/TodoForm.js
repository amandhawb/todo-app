class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      text: ''
    };
  }

  //componentDidMount() {
    //colocar foco no elemento
  //}

  handleOnChange(event) {
    this.setState({
      tex: event.target.value
    });
  }

  handleButtonClick(event) {
    let text = this.state.text;

    if(text !== '') {
      this.props.addItemFn(text);
      this.setState({ text: '' })
    }
  }

  render() {
    return (
      <form className="form-inline">
        <input
          type="text"
          onChange={this.handleOnChange}
          className="form-control"
          placeholder="Add a new todo..."
          value={this.state.text}
        />
        <button
          type="button"
          onClick={this.handleButtonClick}
          className="btn btn-default"
        >
          Adicionar
        </button>
        
      </form>
    );
  }
}