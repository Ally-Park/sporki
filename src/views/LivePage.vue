<template>
  <div class="live-page">
    <div class="content">
      <div class="title">
        <p>생중계 영상</p>
        <button class="league-btn">KBO</button>
      </div>
      <VideoThumnail v-if="checkInit" :thumnail="thumnailContent" :currentSport="getCurrentSports"></VideoThumnail>
      <NoGame v-if="isExistLiveSchedule"></NoGame>
    </div>
    <div class="side-box" v-if="checkInit">
      <div class="other-game">
        <span>경기 목록</span>
        <button @click="$emit('gameListPopup')">버튼</button>
      </div>
      <GameCardList  :games="gameList" @click="onClick"></GameCardList>
    </div>
  </div>
</template>

<script>
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'
// import $apis from '@/apis'
import NoGame from '@/components/game/NoGame.vue'
import VideoThumnail from '@/components/game/VideoThumnail.vue'
import GameCardList from '@/components/GameCardList/GameCardList.vue'
import SportItems from '../sports/SportItems'

export default {
  name: 'GamePlay',
  components: {
    NoGame,
    VideoThumnail,
    GameCardList
  },
  data () {
    return {
      isExistLiveSchedule: false,
      gameList: [],
      thumnailContent: {}
    }
  },
  computed: {
    ...mapGetters([
      types.GET_CURRENT_SPORTS
    ]),
    checkInit () {
      return this.gameList.length !== 0 && this.thumnailContent !== {}
    }
  },
  watch: {
    [types.GET_CURRENT_SPORTS](newVal) { 
      console.log('[GamePlay.vue] watch==>', newVal)
      this.updateSchedule(newVal)
    }
  },
  async created () {
    console.log('[GamePlay.vue] created==>', this[types.GET_CURRENT_SPORTS])
    this.updateSchedule(this[types.GET_CURRENT_SPORTS])
    // TODO: Set Interval
  },
  beforeDestroy () {
    // TODO: Clear Interval
  },
  methods: {
    async updateSchedule (sport) {
      // TODO: Loading
      try {
        const todayGames = await SportItems.getTodayGame(sport)
        if (todayGames.length === 0) {
          console.log('오늘 경기 없음')
          this.isExistLiveSchedule = true
        } else {
          // data parse
          const games = todayGames.filter((game) => {
            return game.gameStatus.code !== 1 || game.gameStatus.code !== 2
          })
          // this.thumnailContent = games.shift()
          this.thumnailContent = games[0]
          this.gameList = games
          this.isExistLiveSchedule = false
        }
      } catch (e) {
        console.error(e)
      }
    },
    onClick (seq) {
      console.log(seq)
      this.$router.push('/liveDetail').catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.live-page {
  float: left;
  display: flex;
  height: 100%;
  width: calc(100% - 410px);
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .title {
      height: 104px;
      display: flex;
      padding-top: 10px;
      box-sizing: border-box;
      // align-items: center;
      font-weight: bold;
      p {
        font-size: 50px;
        margin-right: 40px;
      }
      .league-btn {
        width: 166px;
        height: 70px;
        font-weight: bold;
        color: rgba($color: #fff, $alpha: 0.4); // TODO: 리그 여러개인 경우 색상 변경 필요
        font-size: 30px;
        border-radius: 8px;
        border: solid 2px rgba(255, 255, 255, 0.1);
        background-color: rgba(56, 57, 63, 0.2);
      }
    }
  }
  .side-box {
    display: flex;
    flex-direction: column;
    .other-game {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 140px;
      span {
        font-size: 40px;
        font-weight: bold;
      }
      button {
        width: 80px;
        height: 80px;
        color: white;
      }
    }
  }
}
 

</style>