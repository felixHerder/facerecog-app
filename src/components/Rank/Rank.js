import React from 'react'


const Rank = ({ user }) => {
  return (
    <div>
      <div className='white f5 mh3 mt4'>
        <span className="f3">{user.name ? user.name : user.username} </span>your current entry count is
        <span className="f3"> {user.entries}</span>
      </div>




    </div>
  );
}

export default Rank;