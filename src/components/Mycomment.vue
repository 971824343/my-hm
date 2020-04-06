<template>
  <div class="comment">
    <div class="header">
      <div class="left">
        <img :src=" $axios.defaults.baseURL+ comment.user.head_img " alt />
      </div>
      <div class="center">
        <div class="user">{{ comment.user.nickname }}</div>
        <div class="date">{{ comment.create_date |date2 }}</div>
      </div>
      <div class="right" @click="reply(comment.id,comment.user.nickname)">回复</div>
    </div>
    <div class="fuping" v-if="comment.parent">
      <my-wrapper :count="getcount(0,comment )" :comment="comment.parent"></my-wrapper>
    </div>
    <p class="title">{{ comment.content }}</p>
  </div>
</template>

<script>
// 引入 副评论 组件
import MyWrapper from './Mywrapper'
export default {
  props: {
    comment: Object
  },
  created() {
    // console.log(this.comment, '接收到的数据')
  },
  //   局部注册组件
  components: {
    MyWrapper
    // <my-wrapper></my-wrapper>
  },
  methods: {
    reply(id, nickname) {
      // this.$emit('reply', id, nickname)
      // console.log(id, nickname)
      this.$bus.$emit('reply', id, nickname)
    },
    //   计算楼层方法  递归
    getcount(num, obj) {
      if (obj.parent) {
        return this.getcount(num + 1, obj.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  //   padding: 10px;
  border-bottom: 1px solid #ccc;
  .header {
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    .left {
      img {
        width: 30px;
        height: 30px;
        display: block;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      text-align: left;
      margin-left: 10px;
      font-size: 12px;
    }
    .right {
      font-size: 10px;
      color: #999;
    }
  }
  .fuping {
    padding: 20px;
  }
  .title {
    padding: 10px;
    font-size: 14px;
  }
}
</style>