<template>
  <div class="postdetail">
    <div class="header">
      <div class="left" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right" v-if="list.has_follow" @click="quguan(list.user.id)">已关注</div>
      <div class="rights" v-else @click="guanzhu(list.user.id)">关注</div>
    </div>
    <!-- 渲染数据 -->
    <div class="zhuti">
      <p class="title">{{list.title }}</p>
      <div class="user">
        <span class="nickname">{{list.user.nickname}}</span>
        <span class="data">{{list.create_date | date}}</span>
      </div>
      <!-- 判断是不是视频   autoplay 自动播放  静音-->
      <video v-if="list.type==2" :src="list.content" controls loop muted></video>
      <div v-else class="content" v-html="list.content"></div>
    </div>
    <div class="dianzan">
      <div class="box">
        <div class="left" :class="{cod:list.has_like}" @click="dianzan(list.id)">
          <span class="iconfont icondianzan"></span>
          <span class="num">{{ list.like_length ||0 }}</span>
        </div>
        <div class="right">
          <span class="iconfont iconweixin"></span>
          <span class="weixin">微信</span>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="gentian">
      <h2>精彩跟帖</h2>
    </div>
    <my-comment v-for="item in Commentlist" :key="item.id" :comment="item"></my-comment>

    <!-- 底部 -->
    <div class="fooder" v-if="isShow">
      <div class="input">
        <input type="text" placeholder="写跟帖" @focus="onfocus" />
      </div>
      <div class="iconfont iconpinglun-">
        <div class="iconom">{{ list.comment_length }}</div>
      </div>
      <span class="iconfont iconshoucang" @click="shoucang" :class="{star:list.has_star}"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 底部二 -->
    <div class="text-content" v-else>
      <textarea
        @blur="onblur"
        ref="textarea"
        v-model="textTxt"
        :placeholder="`回复:${replyNickname}`"
      ></textarea>
      <div class="send" @click="send()">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route)
    // let id = this.$route.params.id
    // const res = await this.$axios.get(`/post/${id}`)
    // console.log(res)
    // let { statusCode, data } = res.data
    // if (statusCode == 200) {
    //   this.list = data
    //   console.log(this.list)
    // }
    this.getYm()
    this.getComments()
    // postdetail 创建 就注册一个 reply 事件
    this.$bus.$on('reply', (id, nickname) => {
      this.replyId = id
      this.isShow = !this.isShow
      this.replyNickname = nickname
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    })
  },
  methods: {
    // 刷新页面功能
    async getYm() {
      let id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      let { statusCode, data } = res.data
      if (statusCode == 200) {
        this.list = data
        console.log(this.list)
      }
    },
    // 关注功能
    async guanzhu(id) {
      // console.log('id', this.list.id, '和', id)
      // 判断是否登录 没有登录 就去登录

      if (!localStorage.getItem('token')) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }
      // 发送axios 请求
      const res = await this.$axios.get(`/user_follows/${id}`)
      this.$toast.success(res.data.message)
      this.getYm()
    },
    // 取关功能
    async quguan(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      this.$toast.success(res.data.message)
      this.getYm()
    },
    // 点赞功能
    async dianzan(id) {
      // 判断用户有没有登录 没有登录 去login
      if (!localStorage.getItem('token')) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/post_like/${id}`)
      console.log(res)
      let { statusCode, message } = res.data
      if (statusCode == 200) {
        this.$toast(message)
      }
      this.getYm()
    },
    // 打开 文本域功能
    onfocus() {
      this.isShow = !this.isShow
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    // 关闭文本域
    onblur() {
      if (!this.textTxt) {
        this.isShow = !this.isShow
        // 关闭的时候 把 文本域绑定的 nickname 清空
        this.replyNickname = ''
      }
    },
    // 获得评论 数据
    async getComments() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      let { statusCode, data } = res.data
      this.Commentlist = data
      console.log(this.Commentlist)
    },
    // 接收 传来 回复的id
    // reply(id, nickname) {
    //   // 把 id 存起来
    //   this.replyId = id
    //   this.isShow = !this.isShow
    //   this.replyNickname = nickname
    //   this.$nextTick(() => {
    //     this.$refs.textarea.focus()
    //   })
    // },
    // 发送 功能
    async send() {
      let id = this.$route.params.id
      // 发送 ajax 请求
      const res = await this.$axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data: {
          content: this.textTxt,
          parent_id: this.replyId
        }
      })
      let { statusCode, message } = res.data
      if (statusCode == 200) {
        this.$toast.success(message)
        //  成功之后 情况数据
        this.parent_id = ''
        this.textTxt = ''
        this.isShow = !this.isShow
        // 从新渲染
        this.getComments()
      }
    },
    // 收藏功能
    async shoucang() {
      let id = this.$route.params.id
      console.log('收藏', id)
      const res = await this.$axios.get(`/post_star/${id}`)
      console.log(res)
      //  has_star
      this.getYm()
    }
  },
  data() {
    return {
      list: { user: {} },
      isShow: true,
      Commentlist: [],
      textTxt: '',
      replyId: '',
      replyNickname: ''
    }
  }
}
</script>

<style lang="less" scoped>
.postdetail {
  // padding: 0 20px;
  padding-bottom: 150px;
  .header {
    padding: 0 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .iconfont {
        font-size: 14px;
      }
    }
    .center {
      text-align: left;
      flex: 1;
      margin-left: 5px;
      .iconfont {
        font-size: 50px;
      }
    }
    .right {
      width: 62px;
      height: 24px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 24px;
      border-radius: 15px;
      position: relative;
      top: -2px;
    }
    //
    .rights {
      width: 62px;
      height: 24px;
      border: 1px solid #ff0000;
      background-color: #ff0000;
      color: #fff;
      text-align: center;
      line-height: 24px;
      border-radius: 15px;
      position: relative;
      top: -2px;
    }
  }
}
// 渲染
.zhuti {
  padding: 0 20px;

  .title {
    font-size: 14px;
    font-weight: 500;
  }
  .user {
    padding: 5px 0 10px;
    span {
      margin-right: 10px;
      color: #999;
    }
  }
  /deep/ img {
    width: 100%;
    object-fit: cover;
    display: block;
  }
  .content {
    font-size: 14px;
  }
  video {
    width: 100%;
  }
}
.dianzan {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 25px;
  line-height: 25px;
  .box {
    width: 200px;
    height: 100%;
    margin: 0 auto;
    .left {
      height: 100%;
      width: 75px;
      float: left;
      border-radius: 30px;
      border: 1px solid #ccc;
      span {
        margin-left: 10px;
        font-size: 16px;
      }
      .num {
        font-size: 12px;
      }
      &.cod {
        border-color: orange;
        color: orange;
      }
    }
    .right {
      height: 100%;
      width: 75px;
      float: right;
      border: 1px solid #ccc;
      border-radius: 30px;
      .iconfont {
        color: forestgreen;
        font-size: 14px;
        margin-left: 10px;
      }
      .weixin {
        margin-left: 10px;
        font-size: 12px;
      }
    }
  }
}
// 跟帖
.gentian {
  border-top: 3px solid #ccc;
  padding: 10px;
  h2 {
    text-align: center;
    font-weight: 100;
  }
}
// 底部
.fooder {
  border-top: 1px solid #ccc;
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  height: 60px;
  bottom: 0px;
  // background-color: pink;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .input {
    width: 150px;
    height: 30px;
    background-color: #ccc;
    margin-left: 20px;
    border-radius: 35px;
    input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: #ccc;
      border-radius: 30px;
      text-indent: 1em;
    }
  }
  .iconfont {
    font-size: 24px;
    margin-right: 5px;
  }
  .iconpinglun- {
    position: relative;
    .iconom {
      position: absolute;
      top: -3px;
      left: 11px;
      border-radius: 3px;
      padding: 0 5px;
      background-color: red;
      font-size: 10px;
      color: #fff;
      text-align: center;
    }
  }
}
.text-content {
  border-top: 1px solid #ccc;
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  // height: 100px;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 10px;
  padding-top: 20px;
  textarea {
    width: 261px;
    height: 90px;
    background-color: #ccc;
    outline: none;
    border: none;
    border-radius: 5px;
    text-indent: 2em;
    font-size: 10px;
    padding-top: 10px;
  }
  .send {
    width: 60px;
    height: 25px;
    background-color: red;
    color: #fff;
    text-align: center;
    line-height: 25px;
    margin-top: 1px;
    margin-left: 10px;
    border-radius: 5px;
    align-self: flex-end;
  }
}
.star {
  color: red;
  font-weight: 900;
}
</style>