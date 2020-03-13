import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/Login'
import Register from '../views/Register'

const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/register', component: Register }
  ]
})

export default router
