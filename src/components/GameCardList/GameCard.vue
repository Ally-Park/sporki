<template>
  <div class="game-card" @click="$emit('click', game.seq )">
    <!-- <img v-lazyload :data-lazy="'./test.png'"> -->
    <!-- <img src="./tt.png"> -->
    <div class="league-name">{{ game.leagueCodeName }}</div>
    <div class="game-status">{{ gameStateText(game) }}</div>
    <div class="team">
      <span>{{ game.sportsCodeValue === 'kbaseball' ? game.awayTeamName : game.homeTeamName }}</span>
      <span v-if="game.gameStatus === 2">1</span>
    </div>
    <div class="team">
      <span>{{ game.sportsCodeValue === 'kbaseball' ? game.homeTeamName : game.awayTeamName }}</span>
      <span v-if="game.gameStatus === 2">2</span>
    </div>
    <!-- <div class="title"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    game: {
      types: Object,
      default: () => {}
    }
  },
  methods: {
    gameStateText (game) {
      switch (game.sportsCodeValue) {
        case 'kbaseball':
          if (game.gameStatus.code === 1) {
            // 경기 전
            return game.startTime.substring(0, 5) + ' 예정'
          } else {
            // 경기 중
            return game.inning + '회' + game.topBottonType.name // ex 1회초
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.game-card {
  width: 300px;
  height: 300px;
  border: 1px solid darkgoldenrod;
  // margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .team {
    // display: flex;
    // justify-content: space-around
  }
}
</style>