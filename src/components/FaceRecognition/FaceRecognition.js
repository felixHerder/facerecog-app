import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxArr }) => {
  const handleEnter = (event) => {
    const boxes = document.querySelectorAll('.bounding-box')
    boxes.forEach(box => box.classList.toggle('dim'));
  }
  const handleLeave = (event) => {
    const boxes = document.querySelectorAll('.bounding-box')
    boxes.forEach(box => box.classList.toggle('dim'));
  }
  return (
    <div className=' mb2'>
      <span className="db white-80 f6 mb2">
        {boxArr.length > 1 ?
          boxArr.length + ' swag detected' : 'https://i.imgur.com/GEjml4N.jpeg'}
      </span>
      <div className='relative mh3 dib'>
        <img id='inputImage' className='br3 db shadow-2' alt='' src={imageUrl} width='900px' height='auto' />

        {
          boxArr.length > 0 ?
            boxArr.map((box, index) =>
              <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                className="bounding-box" key={index} data-key={index}
                style={{
                  top: box.top_row, left: box.left_col,
                  right: box.right_col, bottom: box.bottom_row
                }}>
                <span className="tag-box">{box.name} - {box.value.toString().slice(0, 4)}</span>
              </div>)
            : null
        }
      </div>
    </div>
  );
}

export default FaceRecognition;