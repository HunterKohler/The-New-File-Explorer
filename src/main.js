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
  fileNotFound,
  openFile
} = require('./utils/nav');

const {
  windows,
  createWindow
} = require('./utils/windows');

const {
  mainMenu,
  buildContextMenu
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
  openFile(e.sender, dirPath);
});


ipcMain.on('contextMenu', (e, dirPath, filePath) => {
  buildContextMenu(e.sender, dirPath, filePath).popup(e.sender);
});
