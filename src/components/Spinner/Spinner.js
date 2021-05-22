import React from 'react';
import './Spinner.css';

const Spinner = ({isActive}) => {
  return (
    <div className="loader" style={isActive ? { "display": "inline-block" } : { "display": "none" }}>

    </div>
  );

}

export default Spinner;