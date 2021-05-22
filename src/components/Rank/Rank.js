import React from 'react'


const Rank = ({ username, entries }) => {
  return (
    <div>
      <div className='white f5 mh3'>
        <span className="f3">{username} </span>your current entry count is
        <span className="f3"> {entries}</span>
      </div>




    </div>
  );
}

export default Rank;