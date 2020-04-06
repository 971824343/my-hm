<template>
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="recommend"
        />
        <!-- 放大镜 -->
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <!-- 渲染 -->
    <div class="post-list" v-if="postList.length > 0">
      <my-post v-for="post in postList" :key="post.id" :post="post"></my-post>
    </div>

    <!-- 推荐搜索 -->
    <div class="tuijian" v-else-if="tjList.length > 0">
      <div class="list">
        <div
          class="item"
          v-for="item in tjList"
          :key="item.id"
          @click="fn(item.title)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 历史记录 -->

    <div class="content" v-else>
      <h3>历史记录</h3>
      <div class="list">
        <div
          class="item"
          v-for="item in history"
          :key="item"
          @click="history_search(item)"
        >
          {{ item }}
        </div>
      </div>
      <h3>热门搜索</h3>
      <div class="list">
        <div class="item">关晓彤</div>
        <div class="item">关晓彤</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      postList: [],
      // 搜索历史
      history: [],
      tjList: []
    }
  },
  created() {
    const history = JSON.parse(localStorage.getItem('history'))
    if (history) {
      this.history = history
    }
  },
  methods: {
    async search() {
      // 发送ajax请求，获取搜索结果
      this.history = this.history.filter(v => v != this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.history))
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        // 搜索成功之后
      }
    },
    // 历史搜索
    history_search(value) {
      console.log(value)
      this.keyword = value
      // 再进行搜索
      this.search()
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    recommend: _.debounce(async function() {
      {
        console.log('执行了')
        if (!this.keyword) {
          return
        }
        const res = await this.$axios.get('/post_search_recommend', {
          params: {
            keyword: this.keyword
          }
        })
        const { statusCode, data } = res.data
        if (statusCode == 200) {
          this.tjList = data
        }
      }
    }, 1000),
    fn(value) {
      console.log(value)
      this.keyword = value
      this.search()
    }
  },
  // 监听 keyword  为空时 不显示
  watch: {
    keyword(value) {
      if (!value) {
        // 如果没有输入任何的内容，搜索结果清空
        this.postList = []
        this.tjList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  // 头部
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 12px;
    }
    .center {
      padding: 0 10px;
      flex: 1;
      input {
        border-radius: 20px;
        width: 100%;
        border: 1px solid #ccc;
        outline: none;
        height: 26px;
        line-height: 26px;
        text-indent: 3em;
      }
      .iconsearch {
        position: absolute;
        left: 50px;
        top: 15px;
      }
    }
    .right {
      font-size: 12px;
    }
  }
  // 历史记录
  .content {
    padding: 10px;
    h3 {
      font-size: 12px;
      padding: 10px 0;
    }
  }
  .list {
    .item {
      font-size: 12px;
    }
  }
}
// 推荐
.tuijian {
  .item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
