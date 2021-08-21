import React from 'react'
import './ImageLinkForm.css'


class ImageLinkForm extends React.Component {
  render() {
    return (
      <div>
        <p className='f5 ph5'>
          {'This Magic Graph will detect faces in your picture. Try it.'}
        </p>
        <div className="centerInput ma3">
          <div className='form pa4  br3 shadow-2'>
            <input className="f5 pa2 w-70" type='text' placeholder='Paste image url' onChange={this.props.onInputChange} />
            <button className='w-30 grow f5 link  pa2 dib white bg-green' onClick={this.props.onButtonSubmit}>Detect</button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    //this.props.onButtonSubmit();
  }
}

export default ImageLinkForm;