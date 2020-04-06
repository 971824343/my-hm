<template>
  <div class="text">
    <vue-cropper
      :img="img"
      :autoCrop="true"
      fixed
      :autoCropWidth="150"
      :autoCropHeight="150"
      ref="cropper"
    ></vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      img:
        'http://himg2.huanqiu.com/attachment2010/2012/0814/20120814095136664.jpg'
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>