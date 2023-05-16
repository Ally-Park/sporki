<template>
  <div class="thumnail">
    <div class="content">
      <div class="team">
        <img src="" />
        <p> {{ currentSport === 'kbaseball' ? thumnail.awayTeamName : thumnail.homeTeamName }}</p>
      </div>
      <span>VS</span>
      <div class="team">
        <img src="" />
        <p> {{ currentSport === 'kbaseball' ? thumnail.homeTeamName : thumnail.awayTeamName }}</p>
      </div>
    </div>
    <button class="live-btn">
      <p>{{ getCurretStatus(thumnail.gameStatus.code) }}</p>
      <img src="@/images/arrow.png">
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
  width: 1034px;
  height: 582px;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    display: flex;
    gap: 60px;
    align-items: center;
    span {
      font-size: 50px;
      font-weight: bold;
    }
    .team {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      height: fit-content;
      img {
        width: 160px;
        height: 160px;
       //  border: 1px solid bisque; // temp
      }
      
      p {
        margin-top: 10px;
        font-size: 30px;
        font-weight: bold;
        // width: 1034px;
        // height: 582px;
      }
    }
  }
  .live-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    width: 371px;
    height: 90px;
    border-radius: 16px;
    img {
      padding-top: 6px;
    }
  }
  .live-btn:active {
    opacity: 0.5;
  }
}
</style>