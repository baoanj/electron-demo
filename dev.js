const { exec, spawn } = require('child_process')
const webpack = require('webpack')
const electron = require('electron')

process.env.NODE_ENV = 'development'

function startRenderer() {
  exec('vite serve src/renderer --port 8090')
}

function startMain() {
  const compiler = webpack({
    mode: 'development',
    entry: 'src/main/index.js'
  })

  let electronProcess = null

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    if (electronProcess && electronProcess.kill) {
      process.kill(electronProcess.pid)
    }
    electronProcess = spawn(electron, ['src/main/index.js'])
  })
}

function start() {
  startRenderer()
  startMain()
}

start()
