const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

//when the app is ready:
app.whenReady().then(() => {
  //create a new window (invoke preload)
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') //path.join used so paths work over all OSs, __dirname is the current directory
    }
  })

  //load our html into the window
  win.loadFile('index.html')

  //if there isn't a window, create a new one
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//if all the windows get closed, quit the process entirely
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})