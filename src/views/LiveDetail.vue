<template>
<div class="live-detail-page">
  <div class="title">경기 화면</div>
  <div class="current-game-content">
    <div class="player">
      <div class="overlay" v-if="gameStatus !== 0">
        <p class="time">{{ time }}</p>
        <p class="text">{{ '스포츠 중계를 곧 시작합니다.' }}</p>
      </div>
      <div class="no-game" v-else>
        <p class="text">{{ '경기가 종료되었습니다.' }}</p>
      </div>
      <div class="video-section" v-if="false">player</div>
    </div>
    <div class="aside-section">
      <button class="game-detail-btn">경기 상세 정보</button>
      <div class="game-score">
        <p class="game-status">{{ '경기 전'}}</p>
        <div class="score-board">
          <p>{{ '9' }}</p>
          <span>-</span>
          <p>{{ '1' }}</p>
        </div>
        <div class="team-board">
          <div class="team">
            <img />
            <p>{{ 'SK' }}</p>
          </div>
          <div class="team">
            <img />
            <p>{{ '롯데' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <button class="list-btn" @click="onClick('list')">경기 목록</button>
  </div>
  <transition name="slide">
    <div class="other-game-content" v-show="showList">
      <Scroll ref="scroll">
        <div class="title">
          <button @click="onClick('content')">경기 화면</button>
        </div>
        <div class="other-game-card" v-for="(i, k) in gameList" :key="k">
          <div class="other-game-state">
            <p class="league">{{ 'KBO' }}</p>
            <p class="state">{{ '8회초' }}</p>
          </div>
          <div class="other-game-score">
            <p>{{ 'SK' }}</p>
            <img />
            <div class="score-detail">
              <p>{{ '1' }}</p>
              <p>{{ '-' }}</p>
              <p>{{ '1' }}</p>
            </div>
            <img />
            <p>{{ 'SK' }}</p>
          </div>
        </div>
      </Scroll>
    </div>
  </transition>
</div>
</template>

<script>
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'
import Scroll from '@/components/scroll/ScrollComponent.vue';
import SportItems from '@/sports/SportItems';
export default {
  components: {
    Scroll,
  },
  data () {
    return {
      time: 'HH:MM:SS',
      gameStatus: 0,
      showList: false,
      gameList: []
    }
  },
  computed: {
    ...mapGetters([
      types.GET_CURRENT_SPORTS
    ])
  },
  created () {
    // TODO: check current game schedule, setInterval
    this.$nextTick(() => {
      this.$refs.scroll.scrollUpdate()
    })
  },
  methods: {
    async onClick (type) {
      if (type === 'list') {
        console.log(this[types.GET_CURRENT_SPORTS])
        const response = await SportItems.getTodayGame(this[types.GET_CURRENT_SPORTS])
        if (response.length === 0) {
          console.log('오늘 경기 없음')
          // TODO: 경기 없는 경우....뭐해...
        } else {
          const games = response.filter((game) => {
            return game.gameStatus.code !== 1 || game.gameStatus.code !== 2
          })
          // TODO: sort

          this.gameList = games
          this.showList = true
          this.$nextTick(() => {
            this.$refs.scroll.scrollUpdate()
          })
        }
      } else {
        this.showList = false
        this.$nextTick(() => {
          this.$refs.scroll.scrollUpdate()
        })
      }
    } 
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
  
  .title {
    width: 193px;
    height: 50px;
    font-size: 50px;
    font-weight: bold;
    letter-spacing: -1px;
    margin-bottom: 30px;
  }
  .current-game-content {
    display: flex;
    width: 100%;
    .player {
      position: relative;
      width: 1034px;
      height: 582px;
      margin-right: 20px;
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
      .no-game {
        width: 1034px;
        height: 582px;
        border-radius: 16px;
        border: 3px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-weight: 500;
        letter-spacing: -1;
    
        // border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        border-image-source: linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
        border-image-slice: 1;
        background-image: linear-gradient(119deg, #252628 0%, #0c0d0e 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
      .video-section {
      }
    }
    .aside-section {
      // width: 340px;
      .game-detail-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 266px;
        height: 100px;
        font-size: 30px;
        border: solid 2px rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background-image: linear-gradient(#3e3a35, #060b12), linear-gradient(#3e3a35, #060b12);
        background-origin: border-box;
        background-clip: content-box, border-box;
        margin-bottom: 30px;
      }
      .game-detail-btn::after {
        content: '';
        width: 40px;
        height: 40px;
        margin-top: 4px;
        background: url('~@/images/arrow.png'), no-repeat;
      }
      
      .game-score {
        position: relative;
        width: 266px;
        height: 452px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 16px;
        border: solid 3px rgba(240, 215, 187, 0.4);
        background-image: linear-gradient(150deg, #3b3834 0%, #0c0d0e 100%);
        &::before {
          content: '';
          width: 160px;
          height: 4px;
          position: absolute;
          top: -3px;
          left: 8px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(234, 209, 179, 0.6) 22%, #ead1b3 32%, rgba(234, 209, 179, 0.6) 47%, rgba(234, 209, 179, 0.01) 78%, rgba(255, 255, 255, 0) 105%, rgba(234, 209, 179, 0) 105%);
        }
        &::after {
          content: '';
          width: 228px;
          height: 4px;
          position: absolute;
          bottom: -3px;
          left: 20px;
          background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(234, 209, 179, 0.6) 22%, #ead1b3 32%, rgba(234, 209, 179, 0.6) 47%, rgba(234, 209, 179, 0.01) 78%, rgba(255, 255, 255, 0) 105%, rgba(234, 209, 179, 0) 105%);
        }
        .game-status {
          margin-top: 50px;
          font-size: 42px;
          font-weight: bold;
          letter-spacing: -1;
          color: #d5bda8;
        }
        .score-board {
          display: flex;
          align-items: center;
          font-size: 66px;
          font-weight: bold;
          letter-spacing: -1;
          margin: 57px 0 57px 0;
          span {
            margin: 0 33px 0 33px;
          }
        }

        .team-board {
          display: flex;
          gap: 68px;
          .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
            }
            p {
              margin-top: 10px;
              font-size: 30px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    width: 100%;
    .list-btn {
      width: 168px;
      height: 36px;
      font-size: 36px;
      opacity: 0.7;
      letter-spacing: -1px;
      line-height: 1;
      font-weight: bold;
      background: none;
      margin-top: 20px;
    }
  }


  .other-game-content {
    position: absolute;
    background: #05060b;
    top: 0;
    width: 100%;
    height: 100%;
    top: 0;
    .title {
      display: flex;
      justify-content: center;
      width: 100%;
      button {
        width: 139px;
        height: 36px;
        opacity: 0.7;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: -1px;
        line-height: 1;
        background: none;
      }
    }
    .other-game-card {
      width: 1330px;
      height: 140px;
      display: flex;
      margin-bottom: 10px;
      border-radius: 8px;
      // border: 1px solid hotpink;
      .other-game-state {
        display: flex;
        width:390px;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: #14171d;
        .league {
          font-size: 32px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -1px;
          margin-right: 20px;
        }
        .state {
          font-size: 42px;
          font-weight: bold;
          line-height: 1;
          letter-spacing: -1px;
          color: #d5bda8;
        }
      }
      .other-game-score {
        opacity: 0.8;
        width: 930px;
        background-color: #22252b;
        display: flex;
        gap: 20px;
        align-items: center;
        padding-left: 151px;
        box-sizing: border-box;
        // justify-content: center;

        img {
          width: 100px;
          height: 100px;
        }
          // &:last-child {
          //   margin: 0 20px 0 30px;
          // }
        p {
          font-size: 38px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -1px;
        }
        .score-detail {
          display: flex;
          justify-content: center;
          width: 137px;
          justify-content: space-around;
          // height: 100%;
          p {
            font-size: 60px;
            font-weight: bold;
            font-style: normal;
            line-height: 1;
            letter-spacing: -1px;
          }
        }
      }
    }
  }

  .slide {
    transition: all 0.5s;
  }
  .slide-enter-active {
    transition: all 0.5s ease;
  }
  .slide-leave-active {
    transition: all 0.5s ease;
  }
  .slide-enter, .slide-leave-active {
    opacity: 0.5;
    transform: translateY(100%);
  }
}
</style>