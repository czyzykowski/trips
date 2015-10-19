import React from 'react';

let ButtonBar = React.createClass({
  render() {
    return (
      <div className="button-bar">
        {this.props.children}
      </div>
    );
  }
});

let ButtonGroup = React.createClass({
  render() {
    return (
      <div className="button-group">
        {this.props.children}
      </div>
    );
  }
});

let Button = React.createClass({
  render() {
    return (
      <li><a className="button">{this.props.label}</a></li>
    );
  }
});

let Toolbar = React.createClass({
  render() {
    return (
      <ButtonBar>
        <ButtonGroup>
          <Button label="Add new trip"/>
          <Button label="Next month"/>
        </ButtonGroup>
      </ButtonBar>
    );
  }
});

export default Toolbar;
