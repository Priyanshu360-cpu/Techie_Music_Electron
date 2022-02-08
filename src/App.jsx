import logo from './logo.svg';
import './App.css';
import blank from './images/nomusic.jpg'
import techie from './some/folder/techiehi.mp3'
import React, { useState, useEffect, Component }  from "react";
import song from './some/folder/youtube-audio.mp3';
import apple from './index'
import axios from 'axios'
class App extends Component{
  
  axos(){
    let y = document.getElementById("test").value;
    axios.get("https://www.googleapis.com/youtube/v3/search/?key=AIzaSyCSxMvPgYvu45ORWdHkoTdgFqE3Vvn0Mik&part=snippet&q="+y).then(res=>{console.log(res.data.items[0].id.videoId);fetch("http://localhost:9000/"+res.data.items[0].id.videoId)})
  }
  state = {
    audio: new Audio(song),
    isPlaying: false,
  };
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
      console.log("played")
      
    }
    this.setState({ isPlaying: !isPlaying });
  };
  
  render(){
  return (
    <body>
    <h1>Main Window</h1>
   <themes>Test</themes>
    <div id="title">Title</div>
    <img src={blank}></img>
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
