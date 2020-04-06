<template>
  <div class="my-shouc">
    <my-header>我的收藏</my-header>
    <my-post v-for="post in list" :key="post.id" :post="post"></my-post>
  </div>
</template>

<script>
export default {
  async created() {
    // const res = await this.$axios({
    //     url:`/user_star`,
    //     method:'get'
    // })
    const res = await this.$axios.get('/user_star')
    let { data, statusCode } = res.data
    this.list = data
    console.log(this.list)
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

 