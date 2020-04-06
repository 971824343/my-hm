<template>
  <div class="box">
    <my-wrapper v-if="comment.parent" :comment="comment.parent" @reply="reply" :count="count-1"></my-wrapper>
    <div class="wrapper" :class="{bt: ! comment.parent }">
      <!-- 自己掉自己 -->
      <div class="header">
        <div class="left">
          <span class="count">{{ count }} 楼</span>
          <span class="user">{{comment.user.nickname}}</span>
          <span class="date">{{ comment.create_date | date2 }}</span>
        </div>
        <div class="right" @click="reply(comment.id,comment.user.nickname)">回复</div>
      </div>
      <p class="content">{{ comment.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    count: Number
  },
  created() {
    // console.log('接受到的', this.comment)
  },
  //  本组件的 名字 我要自己调用自己了

  name: 'my-wrapper',
  methods: {
    reply(id, nickname) {
      // console.log(id, nickname)
      // this.$emit('reply', id, nickname)
      this.$bus.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  border: 1px solid #ccc;
  //   height: 50px;
  width: 100%;
  //   padding: 10px;
  border-top: none;
  &.bt {
    border-top: 1px solid #ccc;
  }
  .header {
    padding: 10px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    .count,
    .user {
      font-size: 14px;
      margin-right: 5px;
    }
    .date {
      font-size: 10px;
      color: #999;
    }
    .right {
      font-size: 10px;
      color: #999;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px;
  }
}
</style>