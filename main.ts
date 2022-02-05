const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const sound = require("sound-play");
const Discord = require("./discord_presence");
const { app, BrowserWindow, ipcMain, nativeTheme, webContents} = require('electron')
const path = require('path')
const yas = require('youtube-audio-server')
const axios = require("axios")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, './images/snek_large.png'),
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

async function setActivity(largeimage,largetext,detail) {
  const startTimestamp = new Date();
  Discord.rpc.setActivity({
    details: largetext,
    state: detail,
    startTimestamp,
    largeImageKey: largeimage,
    largeImageText: "Techie Electron",
    smallImageKey: 'snek_large',
    smallImageText: 'Beta Mode',
    instance: false,
  });
}
ipcMain.handle('download', async (event,x) => {
  
  let y = x.replace(' ','+');
  const url = "https://www.googleapis.com/youtube/v3/search/?key=AIzaSyCSxMvPgYvu45ORWdHkoTdgFqE3Vvn0Mik&part=snippet&q="+y;
  console.log(url);
            let response, data;
            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) {
                return console.log(`An error occured!`)
            }
            setActivity(data.items[0].snippet.thumbnails.high.url,data.items[0].snippet.title,data.items[0].snippet.channelTitle);
            const id = data.items[0].id.videoId;
            const file = 'whole-lotta-love.mp3'
            console.log(`Downloading ${id} into ${file}...`)
            yas.downloader
              .setFolder('some/folder') 
              .onSuccess(({id, file}) => {
                sound.play(path.join(__dirname, './some/folder/youtube-audio.mp3'));
                console.log(`Yay! Audio (${id}) downloaded successfully into "${file}"!`)
              })
              .onError(({ id, file, error }) => {
                console.error(`Sorry, an error ocurred when trying to download ${id}`, error)
              })
              .download({ id, file})
              event.returnValue = 'Main said I received your Sync message';
  
})

app.whenReady().then(async () => {
  
  createWindow()
  sound.play(path.join(__dirname, './some/folder/techiehi.mp3'));
  
  const contents = webContents.getAllWebContents()[0]
  app.on('activate', () => {
    
    console.log(path.join(__dirname, './images/background.jpg'))
    
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    
    }
  })
  
})

app.on('window-all-closed', () => {
  const fs = require('fs')
  const dir = path.join(__dirname, './some/folder/youtube-audio.mp3');
  try {
    fs.unlinkSync(dir);
    
  } catch (err) {
    console.error(err);
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
