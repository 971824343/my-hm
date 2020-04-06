import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User'
import { Form, Search } from 'vant'
import Edit from '../views/Edit'
import Myfollow from '../views/Myfollow'
import Mycomment from '../views/Mycomment'
import Text from '../views/text'
import Mystar from '../views/Mystar'
import Home from '../views/Home'
import Postdetail from '../views/Postdetail'
import Tabedit from '../views/Tabedit'
import search from '../views/search'
import store from '../store'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' },
    { path: '/myfollow', component: Myfollow, name: 'myfollow' },
    { path: '/mycomment', component: Mycomment, name: 'mycomment' },
    { path: '/text', component: Text, name: 'text' },
    { path: '/my-star', component: Mystar, name: 'my-star' },
    { path: '/post-detail/:id', component: Postdetail, name: 'post-detail' },
    { path: '/tab-edit', component: Tabedit, name: 'tabedit' },
    { path: '/search', component: search, name: 'search' },
  ],
})

// 添加路由守卫
let pathArr = ['/user', '/edit', '/myfollow', '/mycomment', '/my-star']

router.beforeEach(function (to, from, next) {
  // console.log('to', to)
  if (to.name == 'home') {
    console.log('使用vuex 进行缓存')
    store.commit('cache', 'home')
  }

  let token = localStorage.getItem('token')
  if (pathArr.includes(to.path)) {
    if (!token) {
      // next('/login')
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
