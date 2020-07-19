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

//TODO improve dirload name structure
async function dirLoad(webContent, dirPath = homedir) {
  fs.readdir(dirPath, {
    withFileTypes: true
  }, (error, files) => {
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
