const { options } = require("./secrets");
const { app, BrowserWindow } = require('electron/electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Scopes for what data the application wants to access
  const scopes = 'user-read-private ' +
              'user-read-email ' +
              'playlist-read-private ' +
              'playlist-read-collaborative';

  const authUrl = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + options.client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent("https://localhost/oauth/redirect");

  win.loadURL(authUrl);
  win.show();

  // 'will-navigate' is an event emitted when the window.location changes
  // newUrl should contain the tokens you need
  win.webContents.on('will-navigate', (event, newUrl) => {
      console.log('[DEBUG] ' + newUrl);
      // More complex code to handle tokens goes here
  });

  // and load the index.html of the app.
  win.loadFile('./index.html');

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (win === null) {
    createWindow()
  }

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
