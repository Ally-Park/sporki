<template>
  <div class="side-menu">
    <div class="current-sport">야구</div>
    <ul>
      <li id="live" @click="onClick('live', $event)">생중계</li>
      <li id="schedule" @click="onClick('schedule', $event)">일정</li>
      <li id="vod" @click="onClick('vod',  $event)">영상</li>
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
          break
        case 'vod':
          // 영상 page
          break
        default:
          break
      }
    },
    // onClickItem (item, event) {
    //   this.resetEffect()
    //   event.currentTarget.classList.add('active')
    //   const selectedEl = document.getElementById(item.id)
    //   selectedEl.children[1].classList.add('active')
    //   this.$store.commit(types.SET_CURRENT_SPORTS, item.id)
    //   this.$router.push('/game').catch(() => {})
    // },
    // onClick (type, id, event) {
    //   this.resetEffect()
    //   const el = document.getElementById(id)
    //   el.classList.add('active')
    //   event.currentTarget.classList.add('active')
    //   this.$store.commit(types.SET_CURRENT_SPORTS, id)

    //   if (type === 'game') {
    //     // 경기 영상
    //     this.$router.push('/game').catch(() => {})
    //   } else {
    //     // 테마영상
    //     this.$router.push('/theme').catch(() => {})
    //   }
    // },

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
  width: 360px;
  // height: 720px;
  height: 100%;
  float: left;
  background-color: #191a20;
  font-size: 20px;
  text-align: center;

  .current-sport {
    font-size: 40px;
    height: 100px;
  }

  li {
    font-size: 40px;
    text-align: center;
    height: 150px;
    // border: 1px solid;
  }

  li.active {
    border: 3px solid yellowgreen;
  }

  button {
    color: white;
  }


  button.active {
    border: 3px solid blueviolet;
  }
}
</style>