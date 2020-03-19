<template>
  <div class="hm-edit">
    <my-header>编辑资料</my-header>
    <div class="user-tox">
      <img :src=" $axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <my-navbar title="昵称" :content="info.nickname" @click="shownickname"></my-navbar>
    <my-navbar title="密码" :content="info.password.replace(/./g,'*')" @click="showPassword"></my-navbar>
    <my-navbar title="性别" :content=" info.gender == '1' ? '男':'女' " @click="showGender"></my-navbar>

    <!-- 组件调用 -->
    <van-dialog v-model="show" title="修改昵称" @confirm="editNickname" show-cancel-button>
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <!-- 密码框 -->
    <van-dialog v-model="show1" title="修改昵称" @confirm="editPassword" show-cancel-button>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 单选框 -->
    <van-dialog v-model="show2" title="修改昵称" @confirm="editGender" show-cancel-button>
      <!-- --- -->
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- --- -->
    </van-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getInfo()
  },
  methods: {
    // 渲染页面
    getInfo() {
      const user_id = localStorage.getItem('user-id')
      // const token = localStorage.getItem('token')
      this.$axios({
        url: `/user/${user_id}`,
        method: 'get'
        // headers: {
        //   Authorization: token
        // }
      }).then(res => {
        let { statusCode, data } = res.data
        if (statusCode == 200) {
          this.info = data
        }
      })
    },
    // 修改用户方法
    editUser(data) {
      const user_id = localStorage.getItem('user-id')
      // const token = localStorage.getItem('token')
      this.$axios({
        url: `/user_update/${user_id}`,
        method: 'post',
        data: data
        // headers: {
        //   Authorization: token
        // }
      }).then(res => {
        let { statusCode, message } = res.data
        if (statusCode == 200) {
          this.$toast.success(message)
          this.getInfo()
        }
      })
    },
    //显示昵称
    shownickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    // 修改昵称
    editNickname() {
      this.editUser({ nickname: this.nickname })
    },
    // 显示密码
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    // 修改密码
    editPassword() {
      this.editUser({ password: this.password })
    },
    // 显示性别
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    // 修改性别
    editGender() {
      this.editUser({ gender: this.gender })
    },
    // 修改头像
    afterRead(file) {
      // console.log(file)
      const fd = new FormData()
      fd.append('file', file.file)
      // console.log('fd', fd)
      let user_id = localStorage.getItem('user-id')
      // let token = localStorage.getItem('token')
      this.$axios({
        url: `/upload`,
        method: 'post',
        data: fd
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        //  修改头像
        let { statusCode, data } = res.data
        if (statusCode == 200) {
          this.editUser({ head_img: data.url })
        }
      })
    },
    // 显示上传的 格式和 大小
    beforeRead(file) {
      console.log(file)
      if (file.size >= 30 * 1024) {
        this.$toast.fail('图片必须小于30k')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('格式必须为jpg')
        return false
      }
      return true
    }
  },
  data() {
    return {
      info: {
        password: ''
      },
      show: false,
      show1: false,
      show2: false,
      nickname: '',
      password: '',
      gender: ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-tox {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    display: block;
    margin: 30px auto;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
  }
}

.van-field {
  border: 1px solid #ccc;
  margin: 0 auto;
  width: 90%;
}
</style>
