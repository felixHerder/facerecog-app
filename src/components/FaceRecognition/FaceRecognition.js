import React from 'react'

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='abosule mt2'>
        <img alt='uploaded img' src={imageUrl} width='500px' height='auto'/>
      </div>
    </div>
  );
}

export default FaceRecognition;