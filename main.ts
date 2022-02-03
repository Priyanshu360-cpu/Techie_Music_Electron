const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const sound = require("sound-play");
require("./discord_activity");
const { app, BrowserWindow, ipcMain, nativeTheme, webContents} = require('electron')
const path = require('path')
const yas = require('youtube-audio-server')
const axios = require("axios")

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
ipcMain.handle('download', (event,x) => {
  const id = x
  const file = 'whole-lotta-love.mp3'
  console.log(`Downloading ${id} into ${file}...`)
  yas.downloader
    .setFolder('some/folder') 
    .onSuccess(({id, file}) => {
      sound.play("C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some\\folder\\youtube-audio.mp3");
      console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
    })
    .onError(({ id, file, error }) => {
      console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
    })
    .download({ id, file})
})
app.whenReady().then(async () => {
  createWindow()
  sound.play("C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some\\folder\\techiehi.mp3");
  
  const contents = webContents.getAllWebContents()[0]
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
})

app.on('window-all-closed', () => {
  const fs = require('fs')
  const dir = 'C:\\Users\\KIIT\\Desktop\\Techie_Music_Electron\\some\\folder\\youtube-audio.mp3';
  try {
    fs.unlinkSync(dir);
    
  } catch (err) {
    console.error(err);
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
