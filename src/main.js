import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.less'

// 导入 rem 媒体查询
import 'lib-flexible'

// 注册全局组件
import Myheader from './components/Myheader'
import Mylogo from './components/Mylogo'
import Mybtn from './components/Mybtn'
Vue.component('my-header', Myheader)
Vue.component('my-logo', Mylogo)
Vue.component('my-btn', Mybtn)

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router
})
