const path = require('path');
const os = require('os');
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

const {
  mainMenu,
  mainMenuTemplate
} = require('./utils/menus');

const {
  dirLoad,
  fileNotFound
} = require('./utils/nav');

app.on('ready', () => {
  const displaySize = screen.getPrimaryDisplay().size;

  createWindow();
});

ipcMain.on('message', (e, message) => {
  console.log(message);
});

let mainWindow;
let curDir = os.homedir();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('../public/index.html').then(() => {
    dirLoad(mainWindow, curDir);
  });

  Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('dirRequest', (e, file, full) => {
  let tempDir = full ? file : path.join(curDir, file);

  if (!fs.existsSync(tempDir)) {
    fileNotFound(mainWindow, tempDir);
  } else if (fs.statSync(tempDir).isDirectory()) {
    dirLoad(mainWindow, tempDir);
    curDir = tempDir;
  } else {
    shell.openPath(tempDir);
  }
});
