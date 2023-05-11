<template>
  <div class="vod-card">
    <div class="video-box">
      <img v-lazyload :data-lazy="`https://www.sporki.com/${vod.thumbnailImgPath}`">
      <!-- <img v-lazyload :data-lazy="`https://static-cdn.sporki.com/vod/2/1/20230421/39338/Thumbnails/2d3e4350-fb22-471f-b7d3-9fc2932e961f_type2.png`"> -->
      <span>{{ vod.playTimeSec }}</span>
    </div>
    <div class="video-title">
      {{ vod.title }}
    </div>
  </div>
</template>

<script>
// import Scroll from '@/components/scroll/ScrollComponent.vue'
export default {
  props: {
    vod: {
      types: Object,
      default: () => {}
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.vod-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
  margin-right: 30px;
  .video-box {
    width: 100%;
    height: 250px;
    border: 1px solid salmon;
  }
  .video-title {
    text-align: center;
    // display: flex;
    // align-items: center;
  }
}
</style>
