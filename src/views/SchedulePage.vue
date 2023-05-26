<template>
  <div class="schedule-page">
    <!-- schedule
    <div>{{ 'KBO' }}</div> -->
    <CalendarBox @click="onClickDate" :buttons="buttons" :calendarType="'schedule'"></CalendarBox>
    <div class="game-card-section">
      <Scroll ref="scroll" v-if="gameExist" @scrollStart="onScrollStart">
        <div class="card-container">    
          <GameCard
            v-for="game in gameList"
            :key="game.seq"
            :game="game"
            :styleType="'schedule-card'"
            :cardSize="{'width': '310px', 'height': '310px'}"
            @click="onClickGameCard"
            >
          </GameCard>
        </div>
      </Scroll>
      <div v-else class="no-game">
        <p>해당 날짜의 경기가 없어요.<br>다른 날짜를 선택해 주세요.</p>
      </div>
      <div class="floating-btn" v-if="showFloatingBtn" @click="moveTop">
        <img src="../images/top.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/ScrollComponent.vue';
import CalendarBox from '@/components/Calendar/CalendarBox.vue';
import GameCard from '@/components/GameCardList/GameCard.vue';
import { mapGetters } from 'vuex'
import * as types  from '@/store/storeTypes'

export default {
  components: {
    CalendarBox,
    GameCard,
    Scroll
  },
  data () {
    return {
      gameList: [],
      gameExist: false,
      showFloatingBtn: false,
      buttons: ['KBO'] // TODO
    }
  },
  computed: {
    ...mapGetters([
      types.GET_TODAY_GAME_LIST
    ])
  },
  created () {
    // 선택된 날짜에 해당하는 경기 리스트 요청
    // 경기 리스트 요청 Interval 설정
    // 경기 시작 시간이 빠른 순으로 정렬
    console.log(this[types.GET_TODAY_GAME_LIST])
    this.gameList = this[types.GET_TODAY_GAME_LIST]
  },
  methods: {
    onClickDate (gameList) {
      console.log('onClickDate:: ', gameList)
      if (gameList) {
        this.gameExist = true
        this.gameList = gameList
        this.$nextTick(() => {
          this.$refs.scroll.scrollUpdate()
        })
      } else {
        console.log('게임 없음~')
        this.gameExist = false
      }
    },
    onClickGameCard (seq) {
      console.log('[SchedulePage.vue] onClickGameCard::seq::', seq)
      this.$router.push('/gameDetail').catch(() => {})
    },
    onScrollStart () {
      this.showFloatingBtn = true
    },
    moveTop () {
      this.$refs.scroll.moveAt(0,0)
      this.showFloatingBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-page {
  float: left;
  height: 100%;
  width: 1360px;
  overflow: hidden;
  .game-card-section {
    position: relative;
    height: 500px; 
    display: flex;
    justify-content: center;
    // align-items: center;
    
    .card-container {
      display: flex;
      gap: 30px;
      flex-wrap: wrap
    }

    .no-game {
      font-size: 40px;
      font-weight: 500;
      line-height: 1.3;
      letter-spacing: -1px;
      box-sizing: border-box;
      padding-top: 130px;
    }

    .floating-btn {
      position: absolute;
      right: 30px;
      bottom: 0;
      width: 120px;
      height: 120px;
    }
  }
}
</style>