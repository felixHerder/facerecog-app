import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center mb2'>
      <div className='relative mh3 dib'>
        <img id ='inputImage' className='br3 shadow-2' alt='' src={imageUrl} width='600px' height='auto'/>
        <div className="bounding-box" style={{
          top:box.top_row, left:box.left_col,
          right:box.right_col, bottom:box.bottom_row
        }}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;