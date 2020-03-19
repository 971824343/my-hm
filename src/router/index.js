import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User'
import { Form } from 'vant'
import Edit from '../views/Edit'

const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' }
  ]
})

// 添加路由守卫
let pathArr = ['/user', '/edit']

router.beforeEach(function(to, from, next) {
  // console.log('to', to)
  let token = localStorage.getItem('token')
  if (pathArr.includes(to.path)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
