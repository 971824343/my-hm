import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.less'
import axios from 'axios'

// 导入 rem 媒体查询
import 'lib-flexible'

// ================================= 注册全局组件 ================================
import Myheader from './components/Myheader'
import Mylogo from './components/Mylogo'
import Mybtn from './components/Mybtn'
import Myinput from './components/Myinput'
Vue.component('my-header', Myheader)
Vue.component('my-logo', Mylogo)
Vue.component('my-btn', Mybtn)
Vue.component('my-input', Myinput)

// ==============================导入 vant 插件===================================
// import vant from 'vant'
// import 'vant/lib/index.css'
import { Toast } from 'vant'
Vue.use(Toast)

//把 axios 绑定到 Vue原型上
Vue.prototype.$axios = axios

// 配置 axios 默认路径
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router
})
