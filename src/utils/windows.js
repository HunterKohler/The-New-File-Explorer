const homedir = require('os').homedir();

const {
  BrowserWindow
} = require('electron');

const {
  dirLoad
} = require('./nav');

// TODO check if neccessary due to BrowserWindow[] <- the array of uniques
const windows = new Set();

function createWindow(dirPath = homedir, relativeWindow) {
  const options = {
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    // icon: '../../',
    webPreferences: {
      nodeIntegration: true,
      devTools: process.env.NODE_ENV === 'development'
    }
  };

  if (relativeWindow) {
    let pos = relativeWindow.getPosition();
    options.x = pos[0] + 30;
    options.y = pos[1] + 0;
  }

  let newWindow = new BrowserWindow(options);

  newWindow.loadFile('../public/index.html').then(() => {
    dirLoad(newWindow, dirPath);
  });

  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });

  newWindow.on('close', () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);
  return newWindow;
}

module.exports = {
  windows,
  createWindow
};
