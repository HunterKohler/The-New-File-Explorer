const fs = require('fs');

const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  ipcMain,
  shell
} = electron;

async function dirLoad(currentWindow, dirPath) {
  fs.readdir(dirPath, {
    withFileTypes: true
  }, (error, files) => {
    currentWindow.webContents.send('dirContent', dirPath, files);
  });
}

async function fileNotFound(currentWindow, filePath) {
  currentWindow.webContents.send('fileNotFound', filePath);
}

module.exports = {
  dirLoad,
  fileNotFound
};
