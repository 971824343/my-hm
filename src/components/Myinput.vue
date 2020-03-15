<template>
  <div class="my-input">
    <input
      :class="{ success: status === 'success', error: status === 'error' }"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
    />
    <div class="tips" v-show="status == 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: String,
    rule: {
      type: RegExp
    },
    message: {
      type: String
    }
  },
  methods: {
    inputFn(e) {
      let value = e.target.value
      this.$emit('input', value)
      this.vailData(value)
    },
    vailData(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
      }
    }
  },
  data() {
    return {
      status: ''
    }
  }
}
</script>

<style lang="less" scoped>
.my-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    line-height: 30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid #666;
    font-size: 16px;
    outline: none;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }

  .tips {
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
