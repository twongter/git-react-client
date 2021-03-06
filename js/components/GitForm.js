import React from 'react';
import AppSettings from '../../settings.js';

export class GitFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.name,
      value: props.value
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return <div className={`col-sm-${this.props.size}`}>
      <input className="form-control"
        type="search"
        name={this.props.name}
        placeholder={this.props.desc}
        value={this.state.value}
        onChange={this.handleChange} />
      <div className="help">{this.props.desc}</div>
    </div>
  }
}

export class GitForm extends React.Component {
  onFormSubmit = (event) => {
    event.preventDefault();
    const args = {};
    for (let ref in this.refs) {
      const {key, value} = this.refs[ref].state;
      args[key] = value;
    }
    this.props.onSubmit(args);
  }

  render() {
    const children = this.props.children.map((child, i) => {
      const ref = child.props.name;
      return React.cloneElement(child, {key: i, ref});
    });
    return (
      <form className="form-group">
        {children}
        <div className="col-sm-1">
          <button onClick={this.onFormSubmit}>Go</button>
        </div>
      </form>
    );
  }
}