<template>
  <Scroll :horizontal="true" ref="scroll">
    <div class="league-section">
      <button class="league-name">전체</button>
      <button class="league-name" v-for="league in leagueList" :key="league.code">
        {{ league.name }}
      </button>
    </div>
  </Scroll>
</template>

<script>
import Scroll from '@/components/scroll/ScrollComponent.vue'
export default {
  components: {
    Scroll
  },
  props: {
    leagueList: {
      types: Array,
      default: () => []
    }
  },
  created () {
    console.log(this.league)
  }
}
</script>

<style lang="scss" scoped>
.league-section {
  display: flex;
  width: 100%;
  overflow: hidden;
  .league-name {
    color: white;
    font-size: 30px;
    margin-right: 30px;
    // width: 400px;
  }
}
</style>