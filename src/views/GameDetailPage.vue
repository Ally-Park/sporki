<template>
  <div class="game-detail-page">
    <div class="detail">
      <p>경기 상세</p>
      <div>
        <BaseballDetail></BaseballDetail>
      </div>
    </div>
    <div class="vod-list">
      영상 목록
    </div>
  </div>
</template>

<script>
import BaseballDetail from '@/components/gameDetail/BaseballDetail.vue';

export default {
  components: {
    BaseballDetail
  }
}
</script>

<style lang="scss" scoped>
.game-detail-page {
  float: left;
  display: flex;
  height: 100%;
  width: calc(100% - 410px);
  .detail {
    p {
      font-size: 50px;
      font-weight: bold;
      line-height: 1;
      letter-spacing: -1px;
      margin-bottom: 50px;
    }
  }
}
</style>