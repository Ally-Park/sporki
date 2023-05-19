<template>
  <div class="side-menu">
    <div class="current-sport" @click="onClickSettingPopup">
      <span>{{ '야구' }}</span>
      <img src="../../images/drop.png">
    </div>
    <ul>
      <li id="live" @click="onClick('live', $event)">
        <p>생중계</p>
      </li>
      <li id="schedule" @click="onClick('schedule', $event)">
        <p>일정</p>
      </li>
      <li id="vod" @click="onClick('vod',  $event)">
        <p>영상</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types  from '@/store/storeTypes'
// import SportItems from '../../sports/SportItems'
export default {
  data () {
    return {
      sportsList: []
    }
  },
  computed: {
    ...mapGetters([
      types.GET_SPORTS_LIST
    ])
  },
  async created () {
    // temp
    this.$store.commit(types.SET_CURRENT_SPORTS, 'kbaseball')
    this.$router.push('/live').catch(() => {})
    this.$nextTick(() => {
      const el = document.getElementById('live')    
      el.classList.add('active')
    })
  },
  mounted () {
  },
  methods: {
    onClick(type, event) {
      console.log(type)
      this.resetEffect()
      const el = document.getElementById(type)
      el.classList.add('active')
      event.currentTarget.classList.add('active')
      switch (type) {
        case 'live':
          // 생중계 page
          this.$router.push('/live').catch(() => {})
          break
        case 'schedule':
          // 일정 page
          this.$router.push('/schedule').catch(() => {})
          break
        case 'vod':
          // 영상 page
          break
        default:
          break
      }
    },
    onClickSettingPopup () {
      this.$emit('otherSports')
    },

    resetEffect () {
      const li = document.getElementsByTagName('li')
       for (let i of li) {
        if (i.classList.contains('active')) {
          i.classList.remove('active')
        }
      }

      const btn = document.getElementsByClassName('side-button')
      for (let i of btn) {
        if (i.classList.contains('active')) {
          i.classList.remove('active')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  font-weight: bold;
  width: 410px;
  height: 100%;
  float: left;
  // padding-top: 40px;
  // padding-left: 30px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  // border: 1px solid darkcyan;
  .current-sport {
    width: 340px;
    font-size: 40px;
    height: 100px;
    margin-left: 30px;
    border-radius: 8px;
    border: solid 2px rgba(255, 255, 255, 0.1);
    background-image: linear-gradient(#3e3a35, #060b12), linear-gradient(#3e3a35, #060b12);
    background-origin: border-box;
    background-clip: content-box, border-box;
    display: flex;
    align-items: center;
    span {
      /** TODO: gap 속성 사용 여부 검토 */
      margin-left: 21px;
      margin-right: 162px;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }

  li {
    position: relative;
    font-size: 40px;
    opacity: 0.4;
    text-align: center;
    height: 100px;
    margin-top: 30px;
    font-weight: normal;
    font-stretch: normal;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 50px;
  }

  li.active {
    background: url('~@/images/lnb-item-bg.png') no-repeat;
    // border: 3px solid yellowgreen;
    opacity: 1;
    font-weight: bold;
    
    // border-width: 2px;
    // border-image-source: linear-gradient(to right, rgba(240, 215, 187, 0) 1%, #f0d7bb 48%, rgba(240, 215, 187, 0) 94%);
    // border-image-slice: 1;
    // background-image: linear-gradient(to right, rgba(141, 116, 86, 0) 0%, rgba(141, 116, 86, 0.7) 49%, rgba(141, 116, 86, 0.7) 57%, rgba(141, 116, 86, 0) 100%);
  }

  button {
    color: white;
  }


  button.active {
    border: 3px solid blueviolet;
  }
}
</style>