const {
  exec
} = require('child_process');

const homedir = require('os').homedir();

const {
  Menu,
  app,
  ipcMain
} = require('electron');

const {
  dirLoad,
  currentDir
} = require('./nav');

const {
  createWindow
} = require('./windows');

// TODO Flesh out menu temeplates
// TODO Menu shortcuts dont support macos cmd instead of CmdOrCtrl
// electron docs: click (menuItem, browserWindow, event)
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'New Tab',
        accelerator: 'CmdOrCtrl+T'
      },
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click(item, win) {
          createWindow(undefined, win);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit'
  },
  {
    label: 'View'
  },
  {
    label: 'Goto',
    submenu: [{
        label: 'Root',
        click(item, win) {
          dirLoad(win, '/');
        }
      },
      {
        label: 'Home',
        click(item, win) {
          dirLoad(win, '/home');
        }
      },
      {
        label: 'User',
        click(item, win) {
          dirLoad(win, homedir);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Desktop',
        click(item, win) {
          dirLoad(win, `${homedir}/Desktop`);
        }
      },
      {
        label: 'Documents',
        click(item, win) {
          dirLoad(win, `${homedir}/Documents`);
        }
      },
      {
        label: 'Downloads',
        click(item, win) {
          dirLoad(win, `${homedir}/Downloads`);
        }
      },
      {
        label: 'Pictures',
        click(item, win) {
          dirLoad(win, `${homedir}/Pictures`);
        }
      },
      {
        label: 'Videos',
        click(item, win) {
          dirLoad(win, `${homedir}/Videos`);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Trash',
        click(item, win) {
          dirLoad(win, `${homedir}/.local/share/Trash/files`);
        }
      }
    ]
  }
];


const contextMenuTemplate = [{
    label: 'Open File'
  },
  {
    label: 'Open File With...'
  },
  {
    type: 'separator'
  },
  {
    label: 'Rename'
  },
  {
    label: 'Duplicate'
  },
  {
    label: 'Cut'
  },
  {
    label: 'Copy'
  },
  {
    label: 'Cut'
  },
  {
    label: 'Paste'
  },
  {
    type: 'separator'
  },
  {
    label: 'Copy Full Path'
  },
  {
    label: 'Copy Folder path'
  },
  {
    type: 'separator'
  },
  {
    label: 'New File'
  },
  {
    label: 'New Folder'
  },
  {
    type: 'separator'
  },
  {
    label: 'New Tab Here'
  },
  {
    label: 'New Window Here'
  },
  {
    type: 'separator'
  },
  {
    label: 'New Terminal Here',
    click(item, win) {
      win.webContents.send('returnDir');
      ipcMain.once('dirReturn', (e, dirPath) => {
        exec(`gnome-terminal --working-directory=${dirPath}`);
      });
    }
  }
]



if (process.env.NODE_ENV === 'development') {
  mainMenuTemplate.push({
    label: 'DevTools',
    submenu: [{
        label: 'Toggle DevTools',
        accelerator: 'CmdOrCtrl+I',
        click(item, win) {
          win.toggleDevTools();
        }
      },
      { //TODO make built in reload function and add ui button
        label: 'reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, {
          webContents
        }) {
          dirLoad(webContents);
        }
      }
    ]
  });
}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

module.exports = {
  mainMenu,
  contextMenu
};
