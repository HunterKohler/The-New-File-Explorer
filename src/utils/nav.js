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

//TODO improve currentWebContents name structure
async function dirLoad(currentWebContents, dirPath) {
  fs.readdir(dirPath, {
    withFileTypes: true
  }, (error, files) => {
    currentWebContents.send('dirContent', dirPath, files);
  });
}

async function fileNotFound(currentWebContents, filePath) {
  currentWebContents.send('fileNotFound', filePath);
}

module.exports = {
  dirLoad,
  fileNotFound
};
