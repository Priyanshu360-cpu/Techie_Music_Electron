require("./index");
const { app, BrowserWindow, ipcMain, nativeTheme, webContents , Notification } = require('electron')
const path = require('path')
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

app.whenReady().then(() => {
  createWindow()
 
  try {
    async function caller(){
      let a=["Hello","Good Morning","Welcome","4+5","Tell me a joke"];
      let b=Math.floor(Math.random() * a.length)
      const url = "https://api.affiliateplus.xyz/api/chatbot?message="+a[b]+"&botname="+"Techie"+"&ownername="+"Priyanshu";
      let response, data;
      response = await axios.get(url);
      data = response.data;
  
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: 'Incoming Message',
      subtitle: 'from chatbot',
      body: data.message,
      hasReply: true
    })

    notification.on('show', () => console.log('Notification shown'))
    notification.on('click', () => {caller()})
    notification.on('close', () => console.log('Notification closed'))
    notification.on('reply', (event, reply) => {
      console.log(`Reply: ${reply}`)
    })

    notification.show()
  } else {
    console.log('Hm, are notifications supported on this system?')
  }
}
caller()} catch (e) {
  return console.log(`An error occured!`)
}
  const contents = webContents.getAllWebContents()[0]

  // The WebContents class has dozens of methods and
  // events available. As an example, we'll call one
  // of them here: loadURL, which loads Electron's
  // home page.
  const options = { extraHeaders: 'pragma: no-cache\n' }
  contents.loadURL('https://youtube.com', options)
  
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