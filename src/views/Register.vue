<template>
  <div>
    <my-header>注册</my-header>
    <my-logo></my-logo>
    <my-input
      type="text"
      placeholder="手机号/邮箱"
      :rule="/^1\d{4,10}$/"
      v-model="username"
      message="用户名格式错误"
      ref="username"
    ></my-input>
    <!--  [\u4e00-\u9fa5] -->
    <my-input
      type="text"
      placeholder="昵称"
      :rule="/^[\u4e00-\u9fa5]{2,5}$/"
      v-model="nickname"
      message="昵称为中文2-5位"
      ref="nickname"
    ></my-input>
    <my-input
      type="password"
      placeholder="密码"
      :rule="/^\d{3,12}$/"
      v-model="password"
      message="密码格式错误"
      ref="password"
    ></my-input>

    <my-btn @click="zhuce">注册</my-btn>
    <div class="go-login">
      已有账号点击
      <router-link to="/login">登陆</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    async zhuce() {
      let status1 = this.$refs.username.vailData(this.username)
      let status2 = this.$refs.nickname.vailData(this.nickname)
      let status3 = this.$refs.password.vailData(this.password)
      if (!status1 || !status2 || !status3) {
        return
      }
      const res = await this.$axios({
        url: '/register',
        method: 'POST',
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }
      })

      if (res.data.statusCode == 200) {
        this.$toast.success(res.data.message)
        this.$router.push({
          // path: '/login',
          // query: { username: this.username, password: this.password },
          name: 'login',
          params: { username: this.username, password: this.password }
        })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.go-login {
  padding-right: 20px;
  padding-top: 20px;
  text-align: right;
  font-size: 14px;
  a {
    color: orangered;
  }
}
</style>
