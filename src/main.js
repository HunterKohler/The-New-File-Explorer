const path = require('path');
const os = require('os');
const fs = require('fs');

const homeDir = path.join(os.homedir(), '/Documents');

const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  ipcMain
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
    loadPath(homeDir)
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

async function loadPath(path) {
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
