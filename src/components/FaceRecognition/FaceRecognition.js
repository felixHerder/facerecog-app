import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxArr }) => {
  return (
    <div className='center mb2'>
      <div className='relative mh3 dib'>
        <img id='inputImage' className='br3 shadow-2' alt='' src={imageUrl} width='600px' height='auto' />
        {
          boxArr.length > 0
            ? boxArr.map((box, index) =>
              <div className="bounding-box" key={index} style={{
                top: box.top_row, left: box.left_col,
                right: box.right_col, bottom: box.bottom_row
              }}>

              </div>)
            : null
        }

      </div>
    </div>
  );
}

export default FaceRecognition;