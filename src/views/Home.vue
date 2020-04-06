<template>
  <div class="myhome">
    <!-- 头部区域 -->
    <div class="home-head">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <span class="text" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span> 搜索新闻
        </span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab :title="item.name" v-for="item in list" :key="item.id">
        <!-- 分页功能 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            :offset="50"
          >
            <my-post v-for="post in postlist" :key="post.id" :post="post"></my-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      list: [],
      postlist: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      refreshing: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      if (activeTabs) {
        this.list = activeTabs
        this.getPostlist(this.list[this.active].id)
        return
      }
      // 如果 缓存没有 就加载
      const res = await this.$axios.get('/category')
      let { data, statusCode } = res.data
      if (statusCode == 200) {
        this.list = data
        console.log(this.list)
        this.getPostlist(this.list[this.active].id)
      }
    },
    async getPostlist(id) {
      const res = await this.$axios.get('post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      let { statusCode, data } = res.data

      if (this.postlist.length > 0 && this.pageIndex == 1) {
        this.postlist = []
      }

      this.postlist = [...this.postlist, ...data]
      console.log(this.postlist)
      this.loading = false
      this.refreshing = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      console.log('触发onload')
      const id = this.list[this.active].id
      setTimeout(() => {
        this.pageIndex++
        this.getPostlist(id)
      }, 1000)
    },
    onRefresh() {
      console.log('下拉刷新')
      this.pageIndex = 1
      this.pageSize = 5
      this.finished = false
      this.loading = true
      setTimeout(() => {
        const id = this.list[this.active].id
        this.getPostlist(id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.postlist = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      let id = this.list[this.active].id

      setTimeout(() => {
        this.getPostlist(id)
      }, 1000)
      // console.log(this.list)
      // console.log(this.list[this.active].id)
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('to', to)
    // if (to.name != 'post-detail') {
    //   store.commit('uncache', 'home')
    //   next()
    // }
    if (to.name == 'user') {
      this.$store.commit('uncache', 'home')
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.home-head {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: #ff0000;
  display: flex;
  justify-content: space-between;
  .left {
    width: 20%;
    span {
      font-size: 55px;
      color: #fff;
      text-align: center;
    }
  }
  .center {
    flex: 1;
    .text {
      margin-top: 8px;
      height: 36px;
      line-height: 36px;
      display: block;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
      color: #fff;
      border-radius: 20px;
      font-size: 14px;
    }
  }
  .right {
    width: 20%;
    text-align: right;
    span {
      font-size: 24px;
      color: #fff;
    }
  }
}

/deep/ .van-tabs__nav {
  background-color: #ddd;
}
</style>
