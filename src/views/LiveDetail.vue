<template>
<div class="live-detail-page">
    <div class="current-game-content">
      <p>경기 화면</p>
      <div class="player">
        <div class="overlay" v-if="gameStatus === 0">
          <p class="time">{{ time }}</p>
          <p class="text">스포츠 중계를 곧 시작합니다.</p>
        </div>
        <div class="video-section" v-else>player</div>
      </div>
      <div class="aside-section">
        <button class="game-detail-btn">경기 상세 정보</button>
        <div class="game-score">
          <p>{{ '경기 전'}}</p>
          <div class="score-board">
            <div class="team">
              <p>{{ '9' }}</p>
              <p>{{ 'LG' }}</p>
            </div>
            <span>-</span>
            <div class="team">
              <p>{{ '1' }}</p>
              <p>{{ '두산' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button>경기 목록</button>
    <div class="other-game-content">
      <Scroll ref="scroll">
        <p>경기 목록</p>
        <div class="other-game-card" v-for="(i, k) in 5" :key="k"></div>
        <button class="top-btn">맨 위로</button>
      </Scroll>
    </div>
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
  },
  created () {
    // TODO: check current game schedule, setInterval
    this.$nextTick(() => {
      this.$refs.scroll.scrollUpdate()
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.live-detail-page {
  position: relative;
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
      .game-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        .score-board {
          display: flex;
          align-items: center;
          .team {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        }
      }
    }
  }
  .other-game-content {
    position: absolute;

    .show {
      animation: slide 1s ease-in  Alternate;
      @keyframes slide {
        from {
          top: 100%;
        }
        to {
          top: 0%;
        }
      }

      width: 100%;
      top: 0;
    }
    .other-game-card {
      width: 90%;
      height: 100px;
      border: 1px solid hotpink
    }
  }
  .top-btn {
    color: white;
    margin-bottom: 100px;
  }
}
</style>