<template>
<div class="live-detail-page">
  <Scroll ref="scroll">
    <p>경기 화면</p>
    <div class="current-game-content">
      <div class="player">
        <div class="overlay" v-if="gameStatus === 0">
          <p class="time">{{ time }}</p>
          <p class="text">스포츠 중계를 곧 시작합니다.</p>
        </div>
        <div class="video-section" v-else>player</div>
      </div>
      <div class="aside-section">
        <button class="game-detail-btn">경기 상세 정보</button>
        <div>
          <p>{{ '경기 전'}}</p>

        </div>
      </div>
    </div>
    <div class="other-game-content">
      경기 목록
    </div>
    </Scroll>
</div>
</template>

<script>
import Scroll from '@/components/scroll/ScrollComponent.vue';
export default {
  components: {
    Scroll,
  },
  data () {
    return {
      time: 'HH:MM:SS',
      gameStatus: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.live-detail-page {
  font-size: 30px;
  float: left;
  height: 100%;
  width: 1340px;
  .current-game-content {
    display: flex;
    width: 100%;
    .player {
      position: relative;
      width: 1000px;
      height: 610px;
      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .time {
          margin-bottom: 20px;
        }
      }
      .video-section {
      }
    }
    .aside-section {
      width: 340px;
      .game-detail-btn {
        font-size: 20px;
        color: white;
        border: 1px solid darkcyan;
      }
    }
  }
}
</style>