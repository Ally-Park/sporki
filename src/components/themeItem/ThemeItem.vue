<template>
  <div class="theme-item">
    <div class="thumnail-img">
      썸네일
      <span>time</span>
    </div>
    <div>theme</div>
    <div>title</div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.theme-item {
  border: 3px solid darkcyan;
}
.thumnail-img {
  position: relative;
  width: 350px;
  height: 200px;
  border: 1px solid wheat;
  span {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>