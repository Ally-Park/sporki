<template>
  <div class="score-board-table">
    <Scroll :horizontal="true">
      <div class="box">
        <div class="team-box">
          <div>팀명</div>
          <div>{{ 'SK' }}</div>
          <div>{{ '롯데' }}</div>
        </div>
        <div v-for="i in 9" :key="i" class="score-box">
          <div>{{ i }}</div>
          <div>{{ '-' }}</div>
          <div>{{ '-' }}</div>
        </div>
        <div class="rheb">
          <div>R</div>
          <div>{{ '-' }}</div>
          <div>{{ '-' }}</div>
        </div>
        <div class="rheb">
          <div>H</div>
          <div>{{ '-' }}</div>
          <div>{{ '-' }}</div>
        </div>
        <div class="rheb">
          <div>E</div>
          <div>{{ '-' }}</div>
          <div>{{ '-' }}</div>
        </div>
        <div class="rheb last">
          <div>B</div>
          <div>{{ '-' }}</div>
          <div>{{ '-' }}</div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../scroll/ScrollComponent.vue'

export default {
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
.score-board-table {
  box-sizing: border-box;
  width: 994px;
  height: 142px;
  overflow: auto;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  background-image: linear-gradient(to bottom, #22252b, #22252b), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  .box {
    // width: 994px;
    height: 142px;
    display: flex;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1px;

    .team-box, .score-box, .rheb {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
      }

      div:nth-child(1) {
        border-right: 2px solid #22252b;
        background-color: rgba(255, 255, 255, 0.1);
        // TODO: 마지막 child는 border X
      }

      div:nth-child(2) {
        border-right: 2px solid #383b40;
        border-bottom: 2px solid #383b40;
      }
      div:nth-child(3) {
        border-right: 2px solid #383b40;
      }
    }
    .team-box {
      width: 136px;

    }
    .score-box {
      position: relative;
      width: 66px;

    }
    .rheb {
      width: 66px;
      font-weight: 500;
      background: linear-gradient(174deg, #f5e0c0 -297%, #ddaa5f 375%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      &.last {
        div {
          border-right:none;
        }
      }
    }
  }
}
</style>