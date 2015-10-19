import React from 'react';

export default class Row extends React.Component {
  render() {
    return (
      <div classNmae="row">
        {this.props.children}
      </div>
    );
  }
};
