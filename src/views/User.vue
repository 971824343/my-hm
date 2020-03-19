<template>
  <div class="my-use">
    <my-header>我的</my-header>
    <div class="myuserhead" @click="$router.push('/edit')">
      <div class="left">
        <img :src=" $axios.defaults.baseURL+info.head_img" alt />
      </div>
      <div class="center">
        <i v-if="info.gender==1" class="iconfont iconxingbienan"></i>
        <i v-else class="iconfont iconxingbienv"></i>
        <span>{{ info.nickname }}</span>
        <p>{{ info.create_date | date }}</p>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <my-navbar title="我的关注" content="关注的用户"></my-navbar>
    <my-navbar title="我的跟帖" content="跟帖/回复"></my-navbar>
    <my-navbar title="我的收藏" content="文章/视频"></my-navbar>
    <my-navbar title="设置" @click="$router.push('/edit')"></my-navbar>
    <my-navbar title="退出" @click="userOut"></my-navbar>
  </div>
</template>

<script>
export default {
  created() {
    let user_id = localStorage.getItem('user-id')
    let token = localStorage.getItem('token')
    this.$axios({
      url: `/user/${user_id}`,
      method: 'get',
      headers: {
        Authorization: token
      }
    }).then(res => {
      let { statusCode, data } = res.data
      if (statusCode == 200) {
        this.info = data
        console.log(this.info)
      }
    })
  },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    userOut() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '确定要退出吗'
        })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user-id')
          this.$router.push('/login')
          this.$toast.success('已退出')
        })
        .catch(() => {
          // on cancel
          this.$toast('取消退出')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.myuserhead {
  display: flex;
  padding: 0 20px;
  height: 90px;
  border-bottom: 3px solid #ccc;
  align-items: center;
  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: pink;
    }
  }
  .center {
    padding-left: 20px;
    flex: 1;
  }
  .right {
  }
}
</style>
