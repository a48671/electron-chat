const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const { resolve } = require('path');

const dockIcon = resolve(__dirname, 'assets', 'images', 'logo.png');
const trayIcon = resolve(__dirname, 'assets', 'images', 'icon.png');
const isDev = !app.isPackaged;

function createSplashWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    }
  })

  win.loadFile('splash.html')

  return win;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#6e707e',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: resolve(__dirname, 'preload.js')
    }
  });

  void win.loadFile('index.html');
  isDev && win.webContents.openDevTools();

  return win;
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: resolve(__dirname, 'node_modules', '.bin', 'electron')
  });
}

if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon);
}

let tray = null;

app.whenReady().then(() => {
  const template = require('./src/js/utils/menu').createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.once('ready-to-show', () => {
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 1000)
  });
});

ipcMain.on('notification', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
})

ipcMain.on('quit-app', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})


