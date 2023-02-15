import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/404','/root/manage','/root/user'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    //已登录的情况下直接跳转至对应界面
    if (to.path === '/login' && store.getters.roles.length != 0) { //to.path === '/login'
      if(store.getters.roles[0]==1){
        next({ path: '/unit/asset' })
      }else if(store.getters.roles[0]==3){
        next({ path: '/depart/asset' })
      }
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    }else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus=res.data.roles;
          let username=res.data.username;
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            if(store.getters.roles==1){
              next({ path: '/unit/asset' })
            }else if(store.getters.roles==3){
              next({ path: '/depart/asset' })
            }
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
