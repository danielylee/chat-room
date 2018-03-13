const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let index;

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Invite person'
      },
      {
        label: 'Clear chat'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

app.on('ready', () => {
  index = new BrowserWindow({});
  index.loadURL(url.format({
    pathname: path.join(__dirname, '/public/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
