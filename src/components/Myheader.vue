<template>
  <div class="header">
    <span class="left iconfont iconjiantou2" @click="$router.go(-1)"></span>
    <div class="cneter">
      <slot></slot>
    </div>
    <span class="right"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #333;
  text-align: center;
  .cneter {
    flex: 1;
    font-weight: 700;
  }
  .left,
  .right {
    width: 30px;
  }
}
</style>