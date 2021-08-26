import React from 'react'
import Spinner from '../Spinner/Spinner';
import './Register.css'


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isActive: false,
      failedmessage: ''
    }
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  onUserChange = (event) => {
    this.setState({ username: event.target.value });
  }
  onKeyDown = (event) => {
    if (event.code === "Enter")
      this.onSubmitRegister()
  }
  saveAuthTokeninSession = (token) => {
    window.localStorage.setItem('token', token);
  }
  onSubmitRegister = () => {
    this.setState({ isActive: true, failedmessage: "" });
    fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.userId && data.succes === 'true') {
          this.saveAuthTokeninSession(data.token);
          fetch(`${process.env.REACT_APP_API_URL}/profile/${data.userId}`, {
            method: 'get',
            headers: {
              "Content-Type": "application/json",
              "Authorization": data.token
            }
          })
            .then(resp => resp.json())
            .then(data => {
              if (data && data.username) {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
              }
            })
            .catch(console.log);
        }
        else {
          this.setState({ isActive: false });
          this.setState({ failedmessage: "Something is not right" })
        }
      });
  }

  render() {
    return (
      <main className="flex justify-center">
        <div className="pa4 pb3 black-80 br3 ba shadow-5 b--black-10  bg-white-30 mb2 w-100 w-70-m w-30-l mw6 center ">
          <div className="measure" onKeyDown={this.onKeyDown}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw3 ph0 mh0">Register</legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="user">User</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="text" name="user" id="user" autoComplete="off" required onChange={this.onUserChange} />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="password" name="password" id="password" required onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="relative  flex items-center justify-center">
              <input className="b ph3 pv2 input-reset ba bw1 br3 b--black-50 bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmitRegister} />
              <Spinner isActive={this.state.isActive} />
            </div>
            <p className="f6 dark-red">{this.state.failedmessage}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;