<template>
<div class="game-list-popup">
  <div class="popup-header">
    <button @click="$emit('close')"></button>
    <span>경기 목록</span>
  </div>
  <div class="game-contents">
    <Scroll ref="scroll">
      <div class="game-card-box">
        <GameCard v-for="(i, index) in gameList"
        :key="index" 
        :game="i" 
        :cardSize="{'width': '310px', 'height':'310px',}"
        :styleType="'list-popup-card'"
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
    // TODO: sort
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
  width: 100%;
  height: 100%;
  background-color: #22252b;
  .popup-header {
    position: relative;
    height: 160px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;    
    font-size: 46px;
    font-weight: bold;
    letter-spacing: -1;
    line-height: 1;
    button {
      position: absolute;
      left: 60px;
      color: white;
      width: 40px;
      height: 40px;
      background: url('~@/images/close.png') no-repeat;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 1756px;
      height: 1px;
      left: 30px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
    }
  }
  .game-contents {
    height: 100%;
    width: 100%;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 158px;
      opacity: 0.7;
      background-image: linear-gradient(1deg, rgba(0, 0, 0, 0) 1%, #000 95%);
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 158px;
      opacity: 0.7;
      background-image: linear-gradient(179deg, rgba(0, 0, 0, 0) 1%, #000 95%);
    }
    .game-card-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 30px 30px;
      // display: grid;
      // grid-template-columns: repeat(5, 1fr);
      // gap: 10px 20px; / row-gap: 10px; column-gap: 20px; /
    }
  }
}
</style>