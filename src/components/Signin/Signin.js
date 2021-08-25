import React from 'react';
import Spinner from '../Spinner/Spinner';
import './Signin.css';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUser: '',
      signInPassword: '',
      isActive: false,
      failedmessage: ''
    }
  }
  onUserChange = (event) => {
    this.setState({ signInUser: event.target.value });
  }
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }
  onKeyDown = (event) => {
    if (event.code === "Enter")
      this.onSubmitSignIn()
  }
  onSubmitSignIn = () => {
    this.setState({ isActive: true, failedmessage: "" });
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.signInUser,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('home')
        }
        else {
          this.setState({ isActive: false });
          this.setState({ failedmessage: "Wrong username or password" })
        }
      });
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <main className="flex justify-center">
        <div className="pa4 pb2 hover-black-80 br3 ba shadow-5 b--black-20 bg-white-30 mb2 w-100 w-70-m w-30-l mw6">
          <div className="measure" onKeyDown={this.onKeyDown}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw3 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="user">User</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="text" name="user" id="user" required autoComplete="off" onChange={this.onUserChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="password" name="password" id="password" required onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="relative flex items-center justify-center pb2">
              <input className="b ph3 pv2 input-reset ba bw1 br3 b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"
                onClick={this.onSubmitSignIn} />
              <Spinner isActive={this.state.isActive} />
            </div>
            <div className="lh-copy">
              <p onClick={() => onRouteChange('register')} className="f6 underline pointer link dim dark-gray db">Register</p>
            </div>
            <p className="f6 dark-red">{this.state.failedmessage}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Signin;