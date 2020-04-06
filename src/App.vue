<template>
  <div>
    <keep-alive :include="cacheList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['cacheList']),
  },
}
</script>

<style></style>
