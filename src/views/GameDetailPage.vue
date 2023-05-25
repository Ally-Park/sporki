<template>
  <div class="game-detail-page">
    <div class="detail">
      <p>경기 상세</p>
      <div>
        <BaseballDetail></BaseballDetail>
      </div>
    </div>
    <div class="vod-list">
      <div class="title">
        <p>영상 목록</p>
        <button></button>
      </div>
      <div class="vod-container">
        <Scroll>
          <VodCard v-for="i in 5" :key="i"></VodCard>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/ScrollComponent.vue';
import BaseballDetail from '@/components/gameDetail/BaseballDetail.vue';
import VodCard from '@/components/vod/VodCard.vue';

export default {
  components: {
    BaseballDetail,
    VodCard,
    Scroll
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

  .vod-list {
    margin-left: 32px;
    .title {
      width: 310px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      
      p {
        font-size: 40px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: -1px;
      }
      button {
        width: 80px;
        height: 80px;
        background-image: linear-gradient(135deg, #3e3a35 0%, #060b12 100%);
      }
    }
    .vod-container {
      height: 720px;
      width: 330px;
    }
  }
}
</style>