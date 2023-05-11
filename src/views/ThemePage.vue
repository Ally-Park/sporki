<template>
  <div class="theme-play">
    테마 영상
    <ThemeItem></ThemeItem>
  </div>
</template>

<script>
import ThemeItem from '../components/themeItem/ThemeItem.vue'
import * as types  from '@/store/storeTypes'
import { mapGetters } from 'vuex'
// import $apis from '@/apis'

export default {
  name: 'ThemePlay',
  components: {
    ThemeItem
  },
  computed: {
    ...mapGetters([
      types.GET_CURRENT_SPORTS
    ])
  },
  watch: {
    [types.GET_CURRENT_SPORTS](newVal) { 
      console.log('[ThemePlay.vue] watch==>', newVal)
    }
  },
  created () {
    console.log('[ThemePlay.vue] created==>', this[types.GET_CURRENT_SPORTS])
    // this.$store.dispatch('setAllThemeVideo', 'test')
    this.$store.dispatch(types.ACT_SET_ALL_THEME_VIDEO, this[types.GET_CURRENT_SPORTS])
  }
}
</script>

<style lang="scss" scoped>
.theme-play {
  float: left;

}
</style>