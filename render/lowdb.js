const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data')
}

const adapter = new FileSync('./data/todo.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: [], count: 0 }).write()

function addTodo(title) {
  const id = db.get('count').value() + 1

  db.get('todos').push({ id, title, date: Date.now() }).write()

  // Increment count
  db.update('count', n => n + 1).write()
}

function getTodos() {
  return db.get('todos').value()
}

module.exports = {
  addTodo,
  getTodos
}
