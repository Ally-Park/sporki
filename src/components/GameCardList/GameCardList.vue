<template>
  <div class="game-card-list">
    <Scroll ref="scroll">
      <div class="game-card-container">
        <GameCard v-for="(i, index) in games"
          :key="index"  
          :game="i"
          :cardSize="{'width': '310px', 'height': '291px'}"
          @click="(seq) => { $emit('click', seq)}"></GameCard>
      </div>
    </Scroll>
  </div>
</template>

<script>
import GameCard from './GameCard.vue';
import Scroll from '@/components/scroll/ScrollComponent.vue'
export default {
  components: {
    Scroll,
    GameCard
  },
  props: {
    games: {
      types: Array,
      default: () => []
    }
  },
  data () {
    return {
      game: ''
    }
  },
  async created () {
    this.$nextTick(() => {
      this.$refs.scroll.scrollUpdate()
      const el = document.getElementsByClassName('game-card-container')
      el[0].children[0].classList.add('sel')
      el[0].children[0].children[1].style.display = 'block'
      
    })
    console.log('[GameCardList.vue] created', this.games)
  }
}
</script>

<style lang="scss" scoped>
.game-card-list {
  height: 670px;
  width: 340px;
}
.game-card-container {
  display: flex;
  width: 100%;
  flex-direction: column
}
</style>