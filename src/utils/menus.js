const {
  Menu,
  app
} = require('electron');

const {
  dirLoad
} = require('./nav');

const {
  createWindow
} = require('./windows');

// TODO Flesh out menu temeplates
// electron docs: click (menuItem, browserWindow, event)
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'New Tab',
        accelerator: 'Ctrl+T'
      },
      {
        label: 'New Window',
        accelerator: 'Ctrl+N',
        click(item, win){
          createWindow(undefined, win);
        }
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
  },
  {
    label:'Edit'
  },
  {
    label:'View'
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


if (process.env.NODE_ENV === 'development') {
  mainMenuTemplate.push({
    label: 'DevTools',
    submenu: [{
        label: 'Toggle DevTools',
        accelerator: 'Ctrl+I',
        click(item, win) {
          win.toggleDevTools();
        }
      },
      { //TODO make built in reload function and add ui button
        role: 'reload',
      }
    ]
  });
}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

module.exports = {
  mainMenu,
  mainMenuTemplate
};
