<template>
  <div class="myfollow">
    <my-header>我的关注</my-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div>{{ item.nickname }}</div>
          <p>{{ item.create_date }}</p>
        </div>
        <div class="right" @click="quguan(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFollowList()
  },
  methods: {
    async getFollowList() {
      const res = await this.$axios({
        url: `/user_follows`,
        method: 'get'
      })

      let { statusCode, data } = res.data
      if (statusCode == 200) {
        this.list = data
      }
    },
    async quguan(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要取消关注吗'
        })
        const res = await this.$axios({
          url: `/user_unfollow/${id}`,
          method: 'get'
        })
        let { statusCode, message } = res.data
        this.$toast.success(message)
        this.getFollowList()
      } catch {
        this.$toast('取消操作')
      }
    }
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  height: 70px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  .left {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding: 0 20px;
  }
  .right {
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    border-radius: 20px;
    background-color: #999;
  }
}
</style>
