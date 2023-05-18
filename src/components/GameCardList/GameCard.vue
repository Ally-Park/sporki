<template>
  <div class="game-card" @click="$emit('click', game.seq )" 
    :id="`game-${game.seq}`"
    :style="{'width': cardStyle.width, 'height': cardStyle.height}">
    <div class="card-box">
      <div class="league-name">{{ game.leagueCodeName }}</div>
      <div class="game-status">{{ gameStateText(game) }}</div>
      <div class="tema-box" v-if="game.sportsCodeValue === 'kbaseball'">
        <div class="team">
          <img :src="game.sportsCodeValue === 'kbaseball' ? game.awayTeamLogoPath : game.homeTeamLogoPath" />
          <span>{{ game.sportsCodeValue === 'kbaseball' ? game.awayTeamName : game.homeTeamName }}</span>
          <span v-if="game.gameStatus === 2">1</span>
        </div>
        <div class="team">
          <img :src="game.sportsCodeValue === 'kbaseball' ? game.awayTeamLogoPath : game.homeTeamLogoPath" />
          <span>{{ game.sportsCodeValue === 'kbaseball' ? game.homeTeamName : game.awayTeamName }}</span>
          <span v-if="game.gameStatus === 2">2</span>
        </div>
      </div>
      <div v-else class="title-box"></div>
    </div>
    <div class="blur"></div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      types: Object,
      default: () => {}
    },
    size: {
      type: Object,
      default: () => {}
    },
    cardStyle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onClick() {

    },
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap'); // temp

.game-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 310px;
  height: 249px;
  border-radius: 16px;
  border-style: solid;
  border-width: 3px;
  border-image-source: linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #1e1e1e, #1e1e1e), linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-bottom: 26px;

  &.sel {
    border: solid 3px rgba(240, 215, 187, 0.4);
    background-image: linear-gradient(to bottom, #3b3834, #0c0d0e);
    &::before {
      content: '' '';
      width: 160px;
      height: 4px;
      position: absolute;
      top: -3px;
      left: 49px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(234, 209, 179, 0.6) 22%, #ead1b3 32%, rgba(234, 209, 179, 0.6) 47%, rgba(234, 209, 179, 0.01) 78%, rgba(255, 255, 255, 0) 105%, rgba(234, 209, 179, 0) 105%);
    }

    &::after {
      content: '';
      width: 228px;
      height: 4px;
      position: absolute;
      bottom: -3px;
      left: 62px;
      background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(234, 209, 179, 0.6) 22%, #ead1b3 32%, rgba(234, 209, 179, 0.6) 47%, rgba(234, 209, 179, 0.01) 78%, rgba(255, 255, 255, 0) 105%, rgba(234, 209, 179, 0) 105%);
    }

  }

  .blur {
    display: none;
    z-index: -1;
    position: absolute;
    bottom: -49px;
    width: 276.2px;
    height: 104.7px;
    left: 25px;
    background: url('./Play_on.png') no-repeat;
    background-size: contain;
  }

  .card-box {
    margin-top: 33px;
    margin-left: 30px;

    .league-name {
      font-family: 'Roboto';
      font-size: 24px;
      letter-spacing: -1px;
      margin-bottom: 10px;
    }
    .game-status {
      font-family: 'Roboto';
      font-size: 42px;
      font-weight: bold;
      letter-spacing: -1px;
      margin-bottom: 20px;
    }
    .team {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 20px;
      &:first-child {
        margin-bottom: 12px;
      }
      img {
        width: 40px;
        height: 40px;
        margin-right: 40px;
      }
      span {
        font-size: 30px;
        font-weight: bold;
        letter-spacing: -1;
      }
      
    }
  }

 

}
</style>