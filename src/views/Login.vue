<template>
  <div class="login">
    <my-header>登陆</my-header>
    <my-logo></my-logo>

    <my-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式错误"
      ref="username"
    ></my-input>

    <my-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式错误"
      ref="password"
    ></my-input>

    <my-btn @click="login">登陆</my-btn>

    <div class="no-user">
      没有账号点击
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    input(value) {
      console.log(value)
      this.password = value
    },
    login() {
      if (!this.$refs.username.vailData(this.username)) {
        return
      }

      if (!this.$refs.password.vailData(this.password)) {
        return
      }

      this.$axios({
        url: '/login',
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        let { statusCode, data, message } = res.data
        if (statusCode == 200) {
          this.$toast.success(message)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user-id', data.user.id)
          this.$router.push('/user')
        } else {
          this.$toast.fail(message)
        }
      })
    }
  },
  created() {
    // console.log(this.$route.params)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style lang="less" scoped>
.no-user {
  padding-top: 20px;
  padding-right: 20px;
  text-align: right;
  font-size: 16px;
  color: #666;
  a {
    color: orangered;
  }
}
</style>
