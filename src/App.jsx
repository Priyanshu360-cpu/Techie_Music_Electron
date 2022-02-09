import logo from './logo.svg';
import './App.css';
import blank from './images/nomusic.jpg'
import techie from './some/folder/techiehi.mp3'
import React, { useState, useEffect, Component }  from "react";
import song from './some/folder/youtube-audio.mp3';
import apple from './index'
import axios from 'axios'

let z;
class App extends Component{
 
  state = {
    audio: new Audio(song),
    isPlaying: false,
    image: blank
  };
 
  axos(){
    
    let y = document.getElementById("test").value;
    axios.get("https://www.googleapis.com/youtube/v3/search/?key=AIzaSyCSxMvPgYvu45ORWdHkoTdgFqE3Vvn0Mik&part=snippet&q="+y).then(res=>{z=res.data.items[0].id.videoId;fetch("http://localhost:9000/"+res.data.items[0].id.videoId);console.log(res.data.items[0].snippet.thumbnails.high.url);this.setState({image: res.data.items[0].snippet.thumbnails.high.url})})
  }

  player = () =>{
    let x = document.getElementById("test").value;
    let y = x.replace(' ','+');
     apple();
  }
  
  playPause = () => {
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      this.state.audio.pause();
    } else {
      this.state.audio.play();
      console.log(z)
      
    }
    this.setState({ isPlaying: !isPlaying });
  };
  
  render(){
  return (
    <body>
    <h1>Main Window</h1>
   <themes>Test</themes>
    <div id="title">Title</div>
    <img className ="thumb" src={this.state.image}></img>
    <div id="album">Album</div>
    <p>Current theme source: <strong id="theme-source">System</strong></p>
    
<textarea id = "test"></textarea>
<button onClick={this.playPause}>
         Play
        </button>
        <button id = "subo" onClick={this.axos}>
         submit
        </button>

    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>
    <webview src="https://www.github.com/" plugins></webview>
    <script src="renderer.js"></script>
  </body>
  );
  }
}

export default App;
