import React, { useState, useEffect } from 'react'


const Rank = ({ user }) => {
  const [emoji, setEmoji] = useState('');

  const generateEmojis = (entries) => {
    fetch(process.env.REACT_APP_AWS_LAMBDA + '?rank=' + user.entries)
      .then(resp => resp.json())
      .then(data => {
        setEmoji(data.input)
      })
      .catch(err => console.log(err, 'unable to fetch rank'));
  }
  useEffect(() => {
    generateEmojis(user.entries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.entries])
  return (
    <div>
      <div className='white f5 mh3 mt4'>
        <span className="f3">{user.name ? user.name : user.username} </span>your current entry count is
        <span className="f3"> {user.entries}</span>
        {' - rank:'}
        <span className="f3">{emoji}</span>
      </div>
    </div>
  );
}

export default Rank;