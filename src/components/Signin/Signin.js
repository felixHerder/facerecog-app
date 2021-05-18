import React from 'react'


const Signin = ({onRouteChange}) => {
  return (
    <main className="pa4 black-80 br3 ba shadow-5 b--black-10 mv4 w-100 w-70-m w-30-l mw6 center">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white mw5 w-100" type="email" name="email-address"  id="email-address" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white mw5 w-100" type="password" name="password"  id="password" />
          </div>
        </fieldset>
        <div>
          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={()=>onRouteChange('home')} />
        </div>
        <div className="lh-copy mt3">
          <p onClick={()=>onRouteChange('register')} className="f6 pointer link dim black db">Register</p>
        </div>
      </div>
    </main>

  );
}

export default Signin;