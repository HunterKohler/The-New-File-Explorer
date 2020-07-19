const path = require('path');
const fs = require('fs');

const electron = require('electron');

const {
  app,
  Menu,
  ipcMain,
  shell
} = electron;

const {
  dirLoad,
  fileNotFound
} = require('./utils/nav');

const {
  windows,
  createWindow
} = require('./utils/windows');

const {
  mainMenu
} = require('./utils/menus');

// NOTE Not supporting MACOS

app.on('ready', () => {
  Menu.setApplicationMenu(mainMenu);

  createWindow();
});

ipcMain.on('message', (e, message) => {
  console.log(message);
});

ipcMain.on('dirRequest', (e, dirPath) => {
  if (!fs.existsSync(dirPath)) {
    // TODO Could split into dir and file messages
    fileNotFound(e.sender, dirPath);
  } else if (fs.statSync(dirPath).isDirectory()) {
    dirLoad(e.sender, dirPath);
  } else {
    shell.openPath(dirPath);
  }
});
