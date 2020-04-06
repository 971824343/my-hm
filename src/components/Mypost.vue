<template>
  <div class="post" @click=" $router.push(`/post-detail/${post.id}`) ">
    <!-- 视频显示 -->
    <div class="ship" v-if="post.type == 2">
      <div class="play">
        <!-- 播放 的图标 -->
        <div class="tubiao">
          <span class="iconfont iconshipin"></span>
        </div>
        <p class="title">{{post.title}}</p>

        <img :src=" fixUrl(post.cover[0].url) " alt />
        <span>{{post.user.nickname}}</span>

        <span>{{post.comment_length}} 跟帖</span>
      </div>
    </div>

    <!-- 单张图片显示 -->

    <div class="list" v-else-if="post.cover.length==1">
      <div class="item">
        <div class="left">
          <p class="title">{{post.title}}</p>
          <span>
            <span>{{post.user.nickname}}</span>
            {{post.comment_length}}跟帖
          </span>
        </div>
        <div class="right">
          <img :src="fixUrl(post.cover[0].url)" alt />
        </div>
      </div>
    </div>
    <!-- 多张图片显示 -->
    <div class="biglist" v-else>
      <div class="item">
        <p class="title">{{post.title}}</p>
        <div class="imgs">
          <img :src="fixUrl(post.cover[0].url)" alt />
          <img :src="fixUrl(post.cover[1].url)" alt />
          <img :src="fixUrl(post.cover[2].url)" alt />
        </div>
        <span>
          <span>{{post.user.nickname}}</span>
          {{post.comment_length}}跟帖
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  created() {
    // console.log('我是', this.post)
  },
  methods: {
    fixUrl(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 14px;
}
span {
  color: #ccc;
}
.list {
  .item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      img {
        width: 121px;
        height: 75px;
        display: block;
        object-fit: cover;
      }
    }
  }
}

.biglist {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      margin-bottom: 10px;
      display: block;
      object-fit: cover;
    }
  }
}
.ship {
  border-bottom: 1px solid #ccc;
  padding: 10px;

  img {
    width: 340px;
    height: 170px;
    object-fit: cover;
    display: block;
  }
  .play {
    position: relative;
    .tubiao {
      position: absolute;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background-color: #000;
      opacity: 0.3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 46px;
      span {
        font-size: 24px;
      }
    }
  }
}
</style>