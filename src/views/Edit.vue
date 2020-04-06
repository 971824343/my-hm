<template>
  <div class="hm-edit">
    <!-- 裁剪图片功能 -->
    <div class="mask" v-show="isShow">
      <vue-cropper
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
        ref="cropper"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
    <my-header>编辑资料</my-header>
    <div class="user-tox">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>

    <my-navbar title="昵称" :content="info.nickname" @click="shownickname"></my-navbar>
    <my-navbar title="密码" :content="info.password.replace(/./g, '*')" @click="showPassword"></my-navbar>
    <my-navbar title="性别" :content="info.gender == '1' ? '男' : '女'" @click="showGender"></my-navbar>

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
    </van-dialog>
    <!-- ====== -->
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  created() {
    this.getInfo()
  },
  methods: {
    // 渲染页面
    async getInfo() {
      const user_id = localStorage.getItem('user-id')
      // const token = localStorage.getItem('token')
      const res = await this.$axios({
        url: `/user/${user_id}`,
        method: 'get'
      })

      let { statusCode, data } = res.data
      if (statusCode == 200) {
        this.info = data
      }
    },
    // 修改用户方法
    async editUser(data) {
      const user_id = localStorage.getItem('user-id')
      // const token = localStorage.getItem('token')
      const res = await this.$axios({
        url: `/user_update/${user_id}`,
        method: 'post',
        data: data
      })

      let { statusCode, message } = res.data
      if (statusCode == 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    //显示昵称
    shownickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    // 修改昵称
    editNickname() {
      if (!/^[\u4e00-\u9fa5]{2,5}$/.test(this.nickname)) {
        this.$toast.fail('用户名为2-5位中文')
        return
      }

      this.editUser({ nickname: this.nickname })
    },
    // 显示密码
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    // 修改密码
    editPassword() {
      if (!/^\d{3,12}$/.test(this.password)) {
        this.$toast.fail('密码必须为3-12位数字')
        return
      }
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
    // 取消修改
    cancel() {
      this.isShow = false
      this.img = ''
      this.$toast('取消操作')
    },
    // 确定修改
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        let fd = new FormData()
        fd.append('file', data)
        const res = await this.$axios({
          url: `/upload`,
          method: 'post',
          data: fd
        })
        let { statusCode, data: data1 } = res.data
        if (statusCode == 200) {
          this.isShow = false
          this.img = ''
          this.editUser({
            head_img: data1.url
          })
        }
      })
    },
    // 修改头像
    afterRead(file) {
      // console.log(file)
      this.isShow = true
      this.img = file.content
      // const fd = new FormData()
      // fd.append('file', file.file)
      // // console.log('fd', fd)
      // let user_id = localStorage.getItem('user-id')
      // // let token = localStorage.getItem('token')
      // this.$axios({
      //   url: `/upload`,
      //   method: 'post',
      //   data: fd
      //   // headers: {
      //   //   Authorization: localStorage.getItem('token')
      //   // }
      // }).then(res => {
      //   // console.log(res)
      //   //  修改头像
      //   let { statusCode, data } = res.data
      //   if (statusCode == 200) {
      //     this.editUser({ head_img: data.url })
      //   }
      // })
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
      gender: '',
      isShow: false,
      img: ''
    }
  },
  components: {
    VueCropper
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

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: pink;
  opacity: 1;
  z-index: 999;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
