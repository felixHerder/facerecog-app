import React from 'react'

const Navigation = ({ onRouteChange, isSignedin }) => {
  if (isSignedin)
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signout')} className='f5 link dim black-70 underline ph3 pointer mt5 mb0 mr3'>Sign Out</p>
      </nav>
    );
  else
  return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className='f5 link dim black-70 underline ph3 pointer mt5 mb0'>Sign in</p>

        <p onClick={() => onRouteChange('register')} className='f5 link dim black-70 underline ph3 pointer mt5 mb0 mr3'>Register</p>
      </nav>
  );
  
}

export default Navigation;