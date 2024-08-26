import { createApp } from 'vue'

import App from '@/App.vue'

// createApp(App).mount('#app')

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router'
//引入全局样式
import '@/styles/index.scss'
//引入仓库
import pinia from './store'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

import 'virtual:svg-icons-register'
//通过app.use方法安装svg自定义插件
import gloablComponent from './components/index'
//安装自定义插件
app.use(gloablComponent)

//安装仓库
app.use(pinia)

//注册模版路由
app.use(router)
//引入路由鉴权文件
import './permisstion'

//引入自定义指令文件
import { isHasButton } from './directive/has'
isHasButton(app)
//挂载
app.mount('#app')
