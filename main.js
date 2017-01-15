const electron = require('electron')


// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


//
// var io = require('socket.io').listen(30500);
// var spawn = require('child_process').spawn;
//
// io.on('connection', function (socket) {
//   var shell = spawn('/bin/bash')
//     , stdin = shell.stdin;
//   // function getcwd(){
//   //
//   // }
//   //
//   // stdin.write("cd ~\n");
//
//   shell.on('exit', function() {
//     socket.disconnect();
//   })
//
//   shell['stdout'].setEncoding('ascii');
//   shell['stdout'].on('data', function(data) {
//     console.log(data);
//     socket.emit('stdout', data);
//   });
//
//   shell['stderr'].setEncoding('ascii');
//   shell['stderr'].on('data', function(data) {
//     socket.emit('stderr', data);
//   });
//
//   socket.on('stdin', function(command) {
//     stdin.write(command+"\n") || socket.emit('disable');
//   });
//
//   stdin.on('drain', function() {
//     socket.emit('enable');
//   });
//
//   stdin.on('error', function(exception) {
//     socket.emit('error', String(exception));
//   });
// });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, "node-integration": false})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.maximize()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
