const path = require('path');
const os = require('os');
const fs = require('fs');

const homeDir = path.join(os.homedir(), '/Documents');
let curDir = homeDir;


const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  ipcMain,
  shell
} = electron;

app.on('ready', () => {
  const displaySize = screen.getPrimaryDisplay().size;

  createWindow();
});

ipcMain.on('message', (e, message) => {
  console.log(message);
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('../public/index.html').then(() => {
    dirLoad(homeDir)
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('dirRequest', (e, file) => {
  let tempDir = path.join(curDir, file);

  if (fs.statSync(tempDir).isDirectory()){
    dirLoad(tempDir);
    curDir = tempDir;
  } else {
    shell.openPath(tempDir);
  }
});

async function dirLoad(path) {
  fs.readdir(path, {
    withFileTypes: true
  }, (error, files) => {
    mainWindow.webContents.send('dirContent', files);
  });
}

const mainMenuTemplate = [{
  label: 'File',
  submenu: [{
      label: 'New Tab',
      accelerator: 'Ctrl+T'
    },
    {
      label: 'New Window',
      accelerator: 'Ctrl+N'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      accelerator: 'Ctrl+Q',
      click() {
        app.quit();
      }
    }
  ]
}]


if (process.env.NODE_ENV === 'development') {
  mainMenuTemplate.push({
    label: 'DevTools',
    submenu: [{
        label: 'Toggle DevTools',
        accelerator: 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload',
      }
    ]
  })
}
