<template>
  <div class="my-navbar" @click="click">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="right"><span class="iconfont iconjiantou1"> </span></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.my-navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  margin-left: 20px;
  display: flex;
  padding-right: 10px;
  font-size: 14px;
  .left {
  }
  .center {
    flex: 1;
    text-align: right;
    padding-right: 10px;
    color: #ccc;
  }
  .right {
  }
}
</style>
