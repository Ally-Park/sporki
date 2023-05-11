<template>
  <div class="thumnail">
    <div class="content">
      <div class="team">
        <img src="" />
        <p> {{ currentSport === 'kbaseball' ? thumnail.awayTeamName : thumnail.homeTeamName }}</p>
      </div>
      <div>VS</div>
      <div class="team">
        <img src="" />
        <p> {{ currentSport === 'kbaseball' ? thumnail.homeTeamName : thumnail.awayTeamName }}</p>
      </div>
    </div>
    <button class="live-btn">
      <p>{{ getCurretStatus(thumnail.gameStatus.code) }}</p>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    thumnail: {
      typeof: Object,
      default: () => {}
    },
    currentSport: {
      types: String,
      default: ''
    }
  },
  watch: {
    thumnail () {
      console.log('[VideoThumnail.vue] watch:::', this.thumnail)

    }
  },
  created () {
    console.log('[VideoThumnail.vue] created:::', this.thumnail)
  },
  methods: {
    getCurretStatus (code) {
      switch (code) {
        case 1:
          return '중계 예정 보러가기'
        case 2:
          return 'LIVE 중계 보러가기'
        case 3:
          return '경기 종료'
        case 4:
          return '경기 취소'
        case 5:
          return '서스펜디드'
        case 6:
          return '일시중단'
        case 7:
          return '경기포기'
        case 8:
          return '경기연기'
        case 9:
          return '경기 지연'
        case 10:
          return '데이터 지연'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.thumnail {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    .team {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid salmon;
      width: 200px;
      height: 200px;
      img {
        width: 100px;
        height: 100px;
        border: 1px solid bisque;
      }
    }
  }
  .live-btn {
    color: white;
  }
}
</style>