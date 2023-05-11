<template>
  <div class="sports-home">
    <div class="header">
      <!-- <span>{{ this.sport }}</span> -->
      <button class="header-btn1">생중계</button>
      <button class="header-btn2">일정</button>
      <button class="header-btn3">영상</button>
      <button>전체</button>
      <button>야구</button>
      <button>축구</button>
    </div>
    <!-- <div class="content">
      <div class="live-thumnail">Live Thumnail</div>
      <div class="live-card-list" v-for="(game, i) in this.todaySchedule" :key="i">
        <GameCardList :sport="Object.values(game)[0]" v-if="showLiveCard"></GameCardList>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'
// import GameCardList from '@/components/GameCardList'

import SportItems from '../sports/SportItems'

export default {
  components: {
    // LeagueSection,
    // GameCardList,
    // VodSection
  },
  computed: {
    ...mapGetters([
      // types.GET_CURRENT_SPORTS
    ])
  },
  watch: {
    [types.GET_CURRENT_SPORTS] (newVal) {
      console.log('[SportsHome.vue] watch::: ', newVal)
    }
  },
  data () {
    return {
      // leagueList: [],
      sportsList: [],
      sport: '',
      // vodList: [],
      showLiveCard: true,
      todaySchedule: [],
      baseball: [],
      wfootball: [],
      volleyball: [],
      billiards: []
    }
  },
  async created () {
    this.sportsList = await SportItems.getSports()
    console.log(this.sportsList)
    const sportsList = []
    for (let i of this.sportsList) {
      sportsList.push(i.sportsCodeValue)
    }
    this.todaySchedule = await SportItems.getTodayGames(sportsList)
    console.log('[SportsHome.vue] TodayGameList::', this.todaySchedule)
    // for (let i of this.todaySchedule) {
    
    // }

  },
  mounted () {
  },
  methods: {
    onClickVodSetion (type, value) {
      if (type === 'typeDetail') {
        console.log(value)
        this.showLiveCard = !value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sports-home {
  // width: 100%;
  height: 100%;
  @media screen and (max-width: 1280px) {
    width: 800px;
  }
  @media screen and (min-width: 1281px) {
    width: 1300px;
  }
  
  display: flex;
  overflow: hidden;
  display: inline-block;
  .header {
    height: 80px;
    button {
      color: white;
      font-size: 40px;
    }
  }

  .content {
    display: flex;
    width: 100%;
    height: 820px;
    .live-thumnail { 
      width: 800px;
      height: 500px;
      background-color: antiquewhite;
    }
    .live-card-list {
      // width: 100%;
      height: 100%;
    }
  }

}
</style>