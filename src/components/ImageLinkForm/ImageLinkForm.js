import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f4 ph5'>
        {'This Magic Graph will detect faces in your picture. Try it.'}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-2'>
          <input className="f4 pa2 w-70" type='text' onChange={onInputChange} />
          <button className='w-30 grow f4 link br2 ph3 pv2 dib white bg-green' onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;