<template>
  <div class="live-page">
    <div class="header">
      <p>생중계 영상</p>
      <button class="league-btn">KBO</button>
    </div>
    <div class="content">
      <div class="thumnail">
        <NoGame v-if="isExistLiveSchedule"></NoGame>
        <VideoThumnail v-if="checkInit" :thumnail="thumnailContent" :currentSport="getCurrentSports"></VideoThumnail>
      </div>
      <div class="side-box">
        <div class="other-game">
          <span>경기 목록</span>
          <button @click="$emit('gameListPopup')">버튼</button>
        </div>
        <GameCardList  v-if="checkInit" :games="gameList" @click="onClick"></GameCardList>
      </div>
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
          this.thumnailContent = games.shift()
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
  // width: 100%;
  height: 100%;
  .header {
    height: 100px;
    display: flex;
    align-items: center;  
    p {
      font-size: 30px;
    }
    .league-btn {
      color: white;
      font-size: 30px;
    }
  }
  .content {
    display: flex;
    height: 610px;
    .thumnail {
      width: 1000px;
    }
    .side-box {
      .other-game {
        button {
          color: white;
        }
      }
    }
  }
}
</style>