const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
  notificationApi: {
    senNotification(message) {
      ipcRenderer.send('notification', message);
    }
  },
  mainApi: {
    quit() {
      ipcRenderer.send('quit-app');
    }
  }
})
