import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.less'
import axios from 'axios'
import store from './store'

// 导入 rem 媒体查询
import 'lib-flexible'

// ================================= 注册全局组件 ================================
import Myheader from './components/Myheader'
import Mylogo from './components/Mylogo'
import Mybtn from './components/Mybtn'
import Myinput from './components/Myinput'
import Mynavbar from './components/Mynavbar'
import Mypost from './components/Mypost'
import Mycomment from './components/Mycomment'
Vue.component('my-header', Myheader)
Vue.component('my-logo', Mylogo)
Vue.component('my-btn', Mybtn)
Vue.component('my-input', Myinput)
Vue.component('my-navbar', Mynavbar)
Vue.component('my-post', Mypost)
Vue.component('my-comment', Mycomment)

// ==============================导入 vant 插件===================================
// import vant from 'vant'
// import 'vant/lib/index.css'
import {
  Toast,
  Dialog,
  Field,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Uploader,
  Button,
  List,
  Tab,
  Tabs,
  PullRefresh,
} from 'vant'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

// 注册 data 全局 过滤器 === ==
import moment from 'moment'
Vue.filter('date', function (value) {
  return moment(value).format('YYYY-MM-DD')
})
// 过滤器2
Vue.filter('date2', function (value) {
  let d = new Date(value)
  let now = new Date()
  let time = ((now - d) / 1000 / 60 / 60) | 0
  if (time < 24) {
    return time + '小时前'
  }
  return moment(value).format('YYYY-MM-DD')
})

// 处理bus
const bus = new Vue()
Vue.prototype.$bus = bus

//把 axios 绑定到 Vue原型上
Vue.prototype.$axios = axios
// 配置 axios 默认路径
axios.defaults.baseURL = 'http://localhost:3000'
// 添加 axios 响应拦截器
axios.interceptors.response.use(function (res) {
  // console.log('拦截到了', res)
  let { statusCode, message } = res.data
  if (statusCode == 401 && message == '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user-id')
    router.push('/login')
    Toast.fail(message)
  } else {
    return res
  }
})
// 添加axios 请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('请求的时候就触发', config)
  let token = localStorage.getItem('token')
  // 每次请求都会 添加 headers   用户第一次 访问 主页  是没有 token值的，直接去 user 页面  会自动添加token 值 为null

  if (token) {
    config.headers.Authorization = token
  }
  return config
})

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  render: (c) => c(App),
  router,
  store,
})
