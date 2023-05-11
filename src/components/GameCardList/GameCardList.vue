<template>
  <div class="game-card-list">
    <Scroll ref="scroll">
      <div class="game-card-container">
        <!-- <div class="league-name">{{ game }}</div> -->
        <GameCard v-for="(i, index) in games" :key="index" :game="i" @click="(seq) => { $emit('click', seq)}"></GameCard>
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
    })
    console.log('[GameCardList.vue] created', this.games)
  }
}
</script>

<style lang="scss" scoped>
.game-card-list {
  height: 600px;
}
.game-card-container {
  display: flex;
  width: 100%;
  flex-direction: column
}
</style>