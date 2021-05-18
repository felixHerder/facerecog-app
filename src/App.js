import Navigation from './components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js'
import React, {Component} from 'react' 
import './App.css';

const app = new Clarifai.App({
  apiKey: '5e2a1a4ad987448eabcfaba364e27f1f'
 });


const particlesOptions = {
  particles: {
   number:{
    value:70,
    density:{
      enable:true,
      value_area:800
    }
   },
   move:{
     speed:0.5
   }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:''
    }
  }
  onInputChange = (event)=>
  {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl : this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err){

      }
    );
  }
  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
         <FaceRecognition imageUrl= {this.state.imageUrl}/>
      </div>
    )
}
}


export default App;
