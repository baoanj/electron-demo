<template>
  <h1>{{ msg }}</h1>
  <p>
    We are using Node {{ versions.node }}, Chrome {{ versions.chrome }}, and
    Electron {{ versions.electron }} on {{ system.platform }} {{ system.arch }}
    {{ system.version }}
  </p>
  <p>在渲染器进程 ./ 代表 {{ rootDirRenderer }}</p>
  <p>在渲染器进程 __dirname 代表 {{ dirNameRenderer }}</p>
  <p>在主进程 ./ 代表 {{ rootDirMain }}</p>
  <p>在主进程 __dirname 代表 {{ dirNameMain }}</p>
  <p>
    <input v-model="value" />
    <button @click="addTodo">添加</button>
  </p>
  <p v-for="item in todos" :key="item.id">
    {{ item.id }}: {{ item.title }} - {{ new Date(item.date).toLocaleString() }}
  </p>
</template>

<script>
const fs = require('fs')
const path = require('path')
import { addTodo, getTodos } from '../helper/lowdb'
import {
  getProcessVersionsSync,
  getProcessVersionsAsync,
  getRootDirSync,
  getDirnameSync
} from '../helper/ipc'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      versions: {},
      system: {},
      rootDirRenderer: '',
      dirNameRenderer: '',
      rootDirMain: '',
      dirNameMain: '',
      value: '',
      todos: []
    }
  },
  mounted() {
    this.getVersions()
    this.getSystem()
    this.getPathMsg()
    this.getTodos()
  },
  methods: {
    getVersions() {
      this.versions = getProcessVersionsSync()
    },
    async getSystem() {
      try {
        const res = await getProcessVersionsAsync()
        this.system = res
      } catch (error) {
        console.error(error)
      }
    },
    getPathMsg() {
      this.rootDirRenderer = `${path.resolve('./')} (包括: [${fs
        .readdirSync('./')
        .join('] [')}])`
      this.dirNameRenderer = __dirname
      this.rootDirMain = getRootDirSync()
      this.dirNameMain = getDirnameSync()
    },
    getTodos() {
      this.todos = getTodos()
    },
    addTodo() {
      addTodo(this.value)
      this.notify()
      this.getTodos()
      this.$forceUpdate()
    },
    notify() {
      const myNotification = new Notification('Electron Vite', {
        body: '添加了一条待办：' + this.value
      })

      myNotification.onclick = () => {
        console.log('通知被点击')
      }
    }
  }
}
</script>
