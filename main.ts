const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const sound = require("sound-play");
require("./index");
const { app, BrowserWindow, ipcMain, nativeTheme, webContents} = require('electron')
const path = require('path')
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const FaceBook = require("erela.js-facebook");
const yas = require('youtube-audio-server')
const axios = require("axios")
const { Manager } = require("erela.js");
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

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
  sound.play("C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some\\folder\\techiehi.mp3");
  const id = 'RJNrC-qHJNc' // "Whole Lotta Love" by Led Zeppelin.
  const file = 'whole-lotta-love.mp3'
  console.log(`Downloading ${id} into ${file}...`)
  yas.downloader
    .setFolder('some/folder') // Optionally set a folder for downloaded content.
    .onSuccess(({id, file}) => {
      sound.play("C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some\\folder\\youtube-audio.mp3");
      console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
    })
    .onError(({ id, file, error }) => {
      console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
    })
    .download({ id, file})
   
  const contents = webContents.getAllWebContents()[0]

 
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
})

app.on('window-all-closed', () => {
  const fs = require('fs')
  const dir = 'C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some';
  fs.rm(dir, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }

    console.log(`${dir} is deleted!`);
});
  if (process.platform !== 'darwin') {
    app.quit()
  }
})