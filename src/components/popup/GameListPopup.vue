<template>
<div class="game-list-popup">
  <div class="popup-header">
    <button @click="$emit('close')">X</button>
    <span>경기 목록</span>
  </div>
  <div class="game-contents">
    <Scroll ref="scroll">
      <div class="game-card-box">
        <GameCard v-for="(i, index) in gameList"
        :key="index" :game="i" 
        @click="onClickGameCard">
      </GameCard>    
      </div>
    </Scroll>
  </div>
</div>
</template>

<script>
import Scroll from '../scroll/ScrollComponent.vue'
import GameCard from '../GameCardList/GameCard.vue'
// import GameCardList from '../GameCardList/GameCardList.vue'
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'

export default {
  components: {
    Scroll,
    GameCard
    // GameCardList
  },
  data () {
    return {
      gameList: []
    }
  },
  computed: {
    ...mapGetters([
      types.GET_TODAY_GAME_LIST
    ])
  },
  created () {
    console.log(this[types.GET_TODAY_GAME_LIST])
    this.gameList = this[types.GET_TODAY_GAME_LIST]
    this.$nextTick(() => {
      this.$refs.scroll.scrollUpdate()
    })
  },
  methods: {
    onClickGameCard (seq) {
      console.log('[GameListPopup.vue] onClickGameCard::', seq)
    }
  }
}
</script>

<style lang="scss" scoped>
.game-list-popup {
  position: absolute;
  width: 1700px;
  height: 100%;
  background-color: black;
  .popup-header {
    font-size: 30px;
    button {
      font-size: 30px;
      color: white;
    }
  }
  .game-contents {
    height: 100%;
    width: 100%;
    .game-card-box {
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      // gap: 10px 20px; / row-gap: 10px; column-gap: 20px; /
    }
  }
}
</style>