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
  input: 'https://i.imgur.com/LYXjKN6.jpeg',
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

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`${process.env.REACT_APP_API_URL}/profile/${data.id}`, {
              method: 'get',
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              }
            })
              .then(resp => resp.json())
              .then(data => {
                if (data && data.username) {
                  this.loadUser(data);
                  this.onRouteChange('home');
                }
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
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

  calculateBoxLocation = (data) => {
    if (!data || !data.outputs) return {};
    console.log(data);
    const caiBboxArray = data.outputs[0].data.regions.map(reg => ({
      bbox: reg.region_info.bounding_box,
      name: reg.data.concepts[0].name,
      value: reg.data.concepts[0].value
    }));

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return caiBboxArray.filter(b => b.value > 0.7).map(box => ({
      left_col: box.bbox.left_col * width,
      top_row: box.bbox.top_row * height,
      right_col: width - (box.bbox.right_col * width),
      bottom_row: height - (box.bbox.bottom_row * height),
      name: box.name,
      value: box.value
    }));
  }

  displaySwagBox = (boxArr) => {
    this.setState({ boxArr: boxArr })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const token = window.localStorage.getItem('token');
    this.setState({ imageUrl: this.state.input });
    fetch(process.env.REACT_APP_API_URL + '/imageurl', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
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
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              },
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
          this.displaySwagBox(this.calculateBoxLocation(response));
        })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      fetch(process.env.REACT_APP_API_URL + '/profile/signout', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem('token')
        }
      });
      window.localStorage.removeItem('token');
      this.setState(initialState);
    }
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
            <main>
              <Rank user={this.state.user} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} boxArr={boxArr} />
            </main>
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
