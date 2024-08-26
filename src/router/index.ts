//通过vue-router插件来实现
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './router'
//创建路由
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
