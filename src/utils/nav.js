const fs = require('fs');
const path = require('path');

const homedir = require('os').homedir();

const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  ipcMain,
  shell
} = electron;

const {
  File
} = require('./file');

//TODO improve dirload name structure
async function dirLoad(webContent, dirPath = homedir) {
  fs.readdir(dirPath, {
    withFileTypes: true
  }, (error, files) => {
    files = files.map((file) => new File(path.join(dirPath, file.name)));

    webContent.send('dirContent', dirPath, files);
  });
}

async function fileNotFound(currentWebContents, filePath) {
  currentWebContents.send('fileNotFound', filePath);
}

async function openFile(currentWebContents, dirPath) {

  if (!fs.existsSync(dirPath)) {
    // TODO Could split into dir and file messages
    fileNotFound(currentWebContents, dirPath);
  } else if (fs.statSync(dirPath).isDirectory()) {
    dirLoad(currentWebContents, dirPath);
  } else {
    shell.openPath(dirPath);
  }
}

async function reload(currentWebContents) {
  ipcMain.handleOnce('dirReturn', (e, dirPath) => {
    console.log('dsa');
    openFile(currentWebContents, dirPath)
  });
  currentWebContents.send('returnDir');
}

module.exports = {
  dirLoad,
  fileNotFound,
  openFile,
  reload
};
