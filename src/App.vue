<template>
  <div id="app">
    <div id="content-area">
      <SideMenu @otherSports="()=>{ showSetting = true }"></SideMenu>
      <router-view @gameListPopup="() => { showAllGame = true }"></router-view>
      <GameListPopup v-if="showAllGame" @close="() => { showAllGame = false }"></GameListPopup>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/sideTab/SideMenu.vue'
import GameListPopup from './components/popup/GameListPopup.vue'
// import * as types  from '@/store/storeTypes'
// import $apis from '@/apis' 
// import Game from '@/js/Game'
// import SportItems from './sports/SportItems'

export default {
  components: {
    SideMenu,
    GameListPopup
  },
  data () {
    return {
      showSetting: true,
      showAllGame: false
    }
  },
  created () {
    // this.$router.push('/home').catch(() => {})
  },
  methods: {
    onClick () {
      this.showSetting = false
    },
    gameListPopupHandler () {
      this.showAllGame = true
    }
  }
}
</script>

<style lang="scss">
@import url('./style/main.scss');
</style>
