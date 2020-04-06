<template>
  <div class="hm-comment">
    <my-header>我的跟帖</my-header>
    <div class="list">
      <van-list
        @load="onLoad"
        :immediate-check="false"
        :offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{ item.create_date | date }}</div>
          <!-- 父级评论 -->
          <div class="father_content" v-if="item.parent">
            <p class="father_name">回复： {{ item.parent.user.nickname }}</p>

            <p class="father_txt">{{ item.parent.content }}</p>
          </div>

          <div class="content">{{ item.content }}</div>
          <div class="link">
            <div class="one-txt-cut">{{ item.post.title }}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getcommentList()
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 13
    }
  },
  methods: {
    onLoad() {
      console.log('我触底了，我要加载更多数据了')
      setTimeout(() => {
        this.pageIndex++
        this.getcommentList()
      }, 1000)
    },
    getcommentList() {
      this.$axios({
        url: `/user_comments`,
        method: 'get',
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res)
        let { data } = res.data
        this.list = [...this.list, ...data]
        console.log(this.list)
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  padding-left: 20px;
  .time {
    color: #ccc;
    font-size: 12px;
  }
  .content {
    font-size: 14px;
  }
  .link {
    display: flex;
    color: #ccc;
    font-size: 12px;
    div {
      flex: 1;
      padding-right: 60px;
    }
    span {
      // width: 30px;
    }
  }

  .father_content {
    background-color: #ddd;
    margin-right: 20px;
    .father_name {
      font-size: 12px;
      color: #999;
    }
    .father_txt {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
