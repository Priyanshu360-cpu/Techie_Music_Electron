
require("./index");
const { app, BrowserWindow, ipcMain, nativeTheme, webContents} = require('electron')
const path = require('path')
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const FaceBook = require("erela.js-facebook");
const yas = require('youtube-audio-server')
class trip{
constructor(){
  this.manage = null;
}
}

const axios = require("axios")
const { Manager } = require("erela.js");
async function useAPI() {
  const youtube = new Youtube("AIzaSyAoKdUjrLI5Hsmsxp1IR3WA7N_yzub0B78")
  const key = "AIzaSyAoKdUjrLI5Hsmsxp1IR3WA7N_yzub0B78"
  const cookie = "your long browser cookie"
  await youtube.util.downloadMP3("https://www.youtube.com/watch?v=mLJQ0HO5Alc", "./videos/mp3")
}
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
trip.manage=new Manager({
  nodes:  [
    
    {
      "host": "localhost",
      "port": 2333,
      "password": "youshallnotpass",
      "identifier": "Techie",
      "retryAmount": 3,
      "retryDelay": 3000,
      "secure": false 
    
    }
  ],
  send: (id, payload) => {
  },
  autoPlay: true,
  plugins: [new Spotify({
      clientID: "b3d3d4de3fb54cc792c7a11540e98ba1",
      clientSecret: "3318aa6874d740eeb71da77a74d43965",
  }),
          new Deezer(),
          new FaceBook()
      ],
 });
  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(async () => {
  createWindow()
  const id = 'HQmmM_qwG4k' // "Whole Lotta Love" by Led Zeppelin.
  const file = 'whole-lotta-love.mp3'
  console.log(`Downloading ${id} into ${file}...`)
  yas.downloader
    .setFolder('some/folder') // Optionally set a folder for downloaded content.
    .onSuccess(({id, file}) => {
      console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
    })
    .onError(({ id, file, error }) => {
      console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
    })
    .download({ id, file})

  const contents = webContents.getAllWebContents()[0]

  // The WebContents class has dozens of methods and
  // events available. As an example, we'll call one
  // of them here: loadURL, which loads Electron's
  // home page.
 
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})