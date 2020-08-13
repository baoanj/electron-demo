const path = require('path')
const fs = require('fs')
const { ipcMain } = require('electron')

ipcMain.on('asyncMsg', (event, arg) => {
  let replyMsg = null
  if (arg === 1) {
    replyMsg = {
      platform: process.platform,
      arch: process.arch,
      version: process.getSystemVersion()
    }
  }
  event.reply('asyncReply', replyMsg)
})

ipcMain.on('syncMsg', (event, arg) => {
  let returnValue = null
  if (arg === 1) {
    returnValue = process.versions
  } else if (arg === 2) {
    returnValue = `${path.resolve('./')} (包括: [${fs
      .readdirSync('./')
      .join('] [')}])`
  } else if (arg === 3) {
    returnValue = __dirname
  }
  event.returnValue = returnValue
})
