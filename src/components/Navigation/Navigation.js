import React from 'react'
import ProfileIcon from '../ProfileIcon/ProfileIcon'

const Navigation = ({ onRouteChange, isSignedin, toggleModal }) => {
  if (isSignedin)
    return (
      <nav className="flex justify-end">
        <ProfileIcon toggleModal={toggleModal}
          onRouteChange={onRouteChange} />
      </nav>
    );
  else
    return (
      <nav className="flex justify-end">
        <p onClick={() => onRouteChange('signin')} className='f5 b link dim black-70 underline ph3 pointer mt3 mb0'>Sign in</p>

        <p onClick={() => onRouteChange('register')} className='f5 b link dim black-70 underline ph3 pointer mt3 mb0 mr3'>Register</p>
      </nav>
    );

}

export default Navigation;