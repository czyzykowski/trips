import React from 'react';
import cx from 'classnames';


export default class Column extends React.Component {
  render() {
    let options = this.props.options || '';
    if (options === 'centered') {
      options = `${this.props.size.split('-')[0]}-centered`;
    }
    return (
      <div className={cx(this.props.size, options, 'columns')}>
      {this.props.children}
      </div>
    );
  }
};

