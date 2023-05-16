<template>
  <div class="no-game">
    <img src="../../images/sporki_icon.png">
    <p>오늘은 중계가 없어요.<br>일정을 확인해 주세요.</p>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.no-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1406px;
  height: 710px;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    margin-top: 40px;
    font-size: 40px;
    line-height: 1.25;
    letter-spacing: -1px;
  }
}
</style>