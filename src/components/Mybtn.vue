<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.btn {
  width: 320px;
  height: 50px;
  line-height: 50px;
  background-color: red;
  border-radius: 25px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>