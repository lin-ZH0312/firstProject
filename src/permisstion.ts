//路由鉴权，鉴权，项目路由权限设置
import router from './router'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//获取token数据判断是否登录
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  //to将访问
  //from 从哪来
  //next 放行函数
  nprogress.start()
  let token = userStore.token
  //获取用户信息
  let username = userStore.username

  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        //放行
        next()
      } else {
        //如果没有用户信息，在守卫发`请求获得用户信息
        try {
          //获取用户信息
          await userStore.userInfo()

          //放行
          next({ ...to })
        } catch (error) {
          //token过期
          //用户修改本地储存
          //退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((_to: any, _from: any, _next: any) => {
  nprogress.done()
})
