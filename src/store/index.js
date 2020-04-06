import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  //   数据 、 状态
  state: {
    cacheList: [],
  },
  //   函数
  mutations: {
    // 缓存
    cache(state, name) {
      // if (state.cacheList.indexOf(name) ) {
      //   state.cacheList.push(name)
      // }
      if (!state.cacheList.includes(name)) {
        state.cacheList.push(name)
      }
    },
    uncache(state, name) {
      // if (state.cacheList.indexOf(name) !== -1) {
      //   state.cacheList = state.cacheList.filter((v) => v !== name)
      // }
      // console.log('this.cacheList', this.cacheList)
      if (state.cacheList.includes(name)) {
        state.cacheList = state.cacheList.filter((item) => item !== name)
      }
    },
  },
  //   计算属性
  getters: {},
  //   处理异步代码
  actions: {},
})

export default store
