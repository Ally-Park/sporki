<template>
  <div class="schedule-page">
    schedule
    <div>{{ 'KBO' }}</div>
    <CalendarBox></CalendarBox>
    <div class="game-card-section">
      <Scroll ref="scroll">
        <div class="card-container">    
          <GameCard v-for="game in gameList" :key="game.seq" :game="game"></GameCard>
        </div>
      </Scroll>
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
    this.$nextTick(() => {
      this.$refs.scroll.scrollUpdate()
    })
  }
}
</script>

<style lang="scss" scoped>
.schedule-page {
  float: left;
  height: 100%;
  width: 1340px;
  overflow: hidden;
  .game-card-section {
    height: 500px; // TODO change
    .card-container {
      display: flex;
      flex-wrap: wrap
    }
  }
}
</style>