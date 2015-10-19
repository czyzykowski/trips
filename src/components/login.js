import React from 'react';
import Row from 'atoms/row';
import Column from 'atoms/column';
import Auth from 'auth';


export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {username: '', password: ''};
  }

  setInitialState() {
    return {username: '', password: ''};
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  login(event) {
    event.preventDefault();

    Auth.login(this.state.username, this.state.password)
      .then((response) => console.log(response),
            (error) => console.log('error', error));
  }

  render() {
    return (
      <form role="form" action="">
        <Row>
          <Column size='large-6' options='centered'>
            <h1>Login to Trips</h1>
            <label>Username:
              <input type="text" onChange={this.handleUsernameChange.bind(this)} value={this.state.username} />
            </label>
          </Column>
        </Row>
        <Row>
          <Column size='large-6' options='centered'>
            <label>Password:
              <input type="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} />
            </label>
          </Column>
        </Row>
        <Row>
          <Column size='large-6' options='centered'>
            <button type="submit" className="button small"
                    onClick={this.login.bind(this)}>
              Login
            </button>
          </Column>
        </Row>
      </form>
    );
  }
};
