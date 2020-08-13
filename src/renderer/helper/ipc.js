const { ipcRenderer } = require('electron')

let asyncReplyResolve = null

ipcRenderer.on('asyncReply', (event, arg) => {
  if (asyncReplyResolve) asyncReplyResolve(arg)
  asyncReplyResolve = null
})

export function getProcessVersionsAsync() {
  ipcRenderer.send('asyncMsg', 1)
  return new Promise(resolve => {
    asyncReplyResolve = resolve
  })
}

export function getProcessVersionsSync() {
  return ipcRenderer.sendSync('syncMsg', 1)
}

export function getRootDirSync() {
  return ipcRenderer.sendSync('syncMsg', 2)
}

export function getDirnameSync() {
  return ipcRenderer.sendSync('syncMsg', 3)
}
