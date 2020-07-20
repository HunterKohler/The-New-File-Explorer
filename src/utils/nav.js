const fs = require('fs');
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
    files = files.map((file) => new File(file.name, file.isDirectory()));

    webContent.send('dirContent', dirPath, files);
  });
}

async function fileNotFound(currentWebContents, filePath) {
  currentWebContents.send('fileNotFound', filePath);
}

module.exports = {
  dirLoad,
  fileNotFound
};
