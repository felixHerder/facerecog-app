import React from 'react'


const Rank = ({name, entries}) => {
  return (
    <div>
      <div className ='white f4 mh3'>
        {`${name}, your current entry count is`}
        <span className="f2"> {entries}</span>
      </div>

       

       
    </div>
  );
}

export default Rank;