import Navigation from './components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js'
import React, { Component } from 'react'
import './App.css';

const app = new Clarifai.App({
  apiKey: '5e2a1a4ad987448eabcfaba364e27f1f'
});

const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move: {
      speed: 0.5
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: 'photo.jpg',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left_col: clarifaiFace.left_col * width,
      top_row: clarifaiFace.top_row * height,
      right_col: width - (clarifaiFace.right_col * width),
      bottom_row: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        response =>
          this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout')
      this.setState({ isSignedin: false });
    else if (route === 'home')
      this.setState({ isSignedin: true });
    this.setState({ route: route });
  }

  render() {
    const { isSignedin, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin} />

        { route === 'home' ?
          <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </>
          : (route === 'register' ?
            <Register onRouteChange={this.onRouteChange} />
            :
            <Signin onRouteChange={this.onRouteChange} />
          )
        }
      </div>

    )
  }
  componentDidMount() {
    console.log("App mounted");
  }
}


export default App;
