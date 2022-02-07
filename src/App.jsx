import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
   
    <h1>Main Window</h1>
   <themes>Test</themes>
    <image src="./images/nomusic.jpg" id="picture"></image>
    <div id="title">Title</div>
    <div id="album">Album</div>
    <p>Current theme source: <strong id="theme-source">System</strong></p>
    
<textarea id = "test"></textarea>
<button id="subo">submit</button>
    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>
    <webview src="https://www.github.com/" plugins></webview>
    <script src="renderer.js"></script>
  </body>
  );
}

export default App;
