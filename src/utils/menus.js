const homedir = require('os').homedir();

const {
  Menu,
  app
} = require('electron');

const {dirLoad} = require('./nav');

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
  },
  {
    label: 'Goto',
    submenu: [{
        label: 'Root',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, '/');
        }
      },
      {
        label: 'Home',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, '/home');
        }
      },
      {
        label: 'User',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, homedir);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Desktop',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/Desktop`);
        }
      },
      {
        label: 'Documents',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/Documents`);
        }
      },
      {
        label: 'Downloads',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/Downloads`);
        }
      },
      {
        label: 'Pictures',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/Pictures`);
        }
      },
      {
        label: 'Videos',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/Videos`);
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Trash',
        click(item, focusedWindow) {
          dirLoad(focusedWindow, `${homedir}/.local/share/Trash/files`);
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
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
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
