<template>
  <div class="tabedit">
    <my-header>栏目管理</my-header>
    <div class="del">点击删除以下频道</div>
    <div class="list">
      <div
        class="item"
        v-for="item in activeTabs"
        :key="item.id"
        @click="del(item.id)"
      >{{ item.name }}</div>
      <!-- <div class="item">热点</div>
      <div class="item">娱乐</div>
      <div class="item">科技</div>-->
    </div>
    <div class="add">点击添加以下频道</div>
    <div class="list">
      <div
        class="item"
        v-for="item in deactiveTabs"
        :key="item.id"
        @click="add(item.id)"
      >{{ item.name }}</div>
      <!-- <div class="item">热点</div>
      <div class="item">娱乐</div>
      <div class="item">科技</div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存放激活的 数据
      activeTabs: [],
      // 存放没有激活的 数据
      deactiveTabs: []
    }
  },
  async created() {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res)
    let { data } = res.data
    this.activeTabs = data
  },
  methods: {
    del(id) {
      console.log('item', id)
      //   this.activeTabs = this.activeTabs.filter(v => v.id != id)
      const idx = this.activeTabs.findIndex(item => item.id === id)
      console.log(idx)
      //   this.activeTabs.splice(idx, 1)
      this.deactiveTabs.push(this.activeTabs[idx])
      this.activeTabs.splice(idx, 1)
    },
    add(id) {
      console.log(id)
      const idx = this.deactiveTabs.findIndex(item => item.id === id)
      this.activeTabs.push(this.deactiveTabs[idx])
      this.deactiveTabs.splice(idx, 1)
    }
  },
  watch: {
    activeTabs: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
        localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabedit {
  .del {
    font-size: 10px;
    color: #999;
  }
  .list {
    overflow: hidden;
    margin-top: 10px;
    .item {
      //   width: 10%;
      border: 1px solid #ccc;
      padding: 10px 20px;
      margin-right: 10px;
      margin-left: 13px;
      margin-bottom: 10px;
      font-size: 12px;
      float: left;
    }
  }
  .add {
    font-size: 10px;
    color: #999;
  }
}
</style>