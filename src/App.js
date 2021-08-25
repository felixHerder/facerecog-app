import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Footer from './components/Footer/Footer';
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

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
      speed: 0.2
    },
    color: {
      value: "#eee",
    },
    links: {
      color: "#eee",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    }
  }
};

const initialState = {
  input: 'https://cdn.seat42f.com/wp-content/uploads/2013/08/12201104/CHARLIE-Its-Always-Sunny-In-Philadelphia.jpg',
  imageUrl: '',
  boxArr: [],
  route: 'signin',
  isSignedin: false,
  isProfileOpen: false,
  user: {
    id: "",
    username: "",
    name: ' ',
    entries: 0,
    joined: '',
    pet: 'chupakapra',
    color: '#555555'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        pet: data.pet,
        color: data.color,
        username: data.username,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const caiBboxArray = data.outputs[0].data.regions.map(reg => reg.region_info.bounding_box);

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return caiBboxArray.map(bbox => ({
      left_col: bbox.left_col * width,
      top_row: bbox.top_row * height,
      right_col: width - (bbox.right_col * width),
      bottom_row: height - (bbox.bottom_row * height)
    }));
  }

  displayFaceBox = (boxArr) => {
    this.setState({ boxArr: boxArr })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(process.env.REACT_APP_API_URL + '/imageurl', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(resp => resp.json())
      .then(
        response => {
          if (response) {
            fetch(process.env.REACT_APP_API_URL + '/image', {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(res => res.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }, ['id', 'entries']));
              })
              .catch(err => console.log(err));
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout')
      this.setState(initialState);
    else if (route === 'home')
      this.setState({ isSignedin: true });
    this.setState({ route: route });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  render() {
    const { isSignedin, imageUrl, route, boxArr, isProfileOpen, user } = this.state;
    return (
      <div className="App" >
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin} toggleModal={this.toggleModal}
        />
        {isProfileOpen && <Modal >
          <Profile
            isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
        </Modal>}
        {route === 'home' ?
          <>
            <Logo className="fl" />
            <Rank username={this.state.user.username} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} boxArr={boxArr} />
          </>
          : (route === 'register' ?
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        <Footer />
      </div>
    )
  }
}

export default App;
