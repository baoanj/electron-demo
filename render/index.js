const fs = require('fs')
const path = require('path')
const db = require('./lowdb')

window.onload = () => {
  getPkg()
  renderTodo()
}

function getPkg() {
  const rootDir = fs.readdirSync('./').join('] [')
  document.querySelector('#root').innerHTML = `
    ./: ${path.resolve('./')} 包括: [${rootDir}]<br>
    __dirname: ${__dirname}`
}

async function renderTodo() {
  const todos = await db.getTodos()
  let str = ''
  todos.forEach(item => {
    str += `<p>${item.id}: ${item.title} - ${
      new Date(item.date).toLocaleString()
    }</p>`
  })
  document.querySelector('#todos').innerHTML = str
}

async function addTodo() {
  await db.addTodo(document.querySelector('#todo').value)
  renderTodo()
}
