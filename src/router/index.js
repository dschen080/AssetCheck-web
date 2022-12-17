import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/login'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '/root',
    component: Layout,
    redirect: '/root/manage',
    name: 'root',
    meta: {title: '超级管理员', icon: 'product'},
    hidden: true, //暂时屏蔽
    children: [{
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/root/index'),
      meta: {title: '单位管理', icon: 'product-list'},
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/root/user'),
      meta: {title: '人员管理', icon: 'product-list'},
    }
  ]
  },
]

export const asyncRouterMap = [
  {
    path: '/unit',
    component: Layout,
    redirect: '/unit/asset',
    name: '1',
    meta: {title: '单位资产管理员', icon: 'product'},
    children: [{
      path: 'asset',
      name: 'asset',
      component: () => import('@/views/unit/asset'),
      meta: {title: '资产管理', icon: 'product-list'}
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/unit/user'),
      meta: {title: '人员管理', icon: 'product-list'}
    },
    {
      path: 'task',
      name: 'task',
      component: () => import('@/views/unit/task'),
      meta: {title: '盘点任务管理', icon: 'product-list'}
    },
    {
      path: 'his',
      name: 'his',
      component: () => import('@/views/unit/his'),
      meta: {title: '盘点历史管理', icon: 'product-list'},
      hidden: true
    },
    {
      path: 'his2',
      name: 'his2',
      component: () => import('@/views/unit/his2'),
      meta: {title: '盘点历史管理', icon: 'product-list'}
    },
  ]
  },
  {
    path: '/depart',
    component: Layout,
    redirect: '/depart/asset',
    name: '3',
    meta: {title: '部门资产管理员', icon: 'product'},
    children: [{
      path: 'asset',
      name: 'asset',
      component: () => import('@/views/depart/asset'),
      meta: {title: '资产管理', icon: 'product-list'}
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/depart/user'),
      meta: {title: '人员管理', icon: 'product-list'}
    },
    {
      path: 'task',
      name: 'task',
      component: () => import('@/views/depart/task'),
      meta: {title: '盘点任务管理', icon: 'product-list'}
    },
    {
      path: 'his',
      name: 'his',
      component: () => import('@/views/depart/his'),
      meta: {title: '盘点历史管理', icon: 'product-list'},
      hidden: true
    },
    {
      path: 'his2',
      name: 'his2',
      component: () => import('@/views/depart/his2'),
      meta: {title: '盘点历史管理', icon: 'product-list'}
    },
  ]
  },
  {path: '*', name: '404', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
