<template>
    <div id="target-root" class="sports-setting">
      <Scroll :horizontal="true" ref="scroll" id="target-scroll">      
        <div class="sports-card-container">
          <div class="sport-card">Sporki</div>
          <div class="sport-card" v-for="sport in sports" :key="sport.code" @click="onClickSport(sport)">
            {{ sport.name }}
            <div v-for="league in sport.league" :key="league.code"> {{ league.name }}</div>
          </div>
        </div>
      </Scroll>
    </div>
  </template>
  
  <script>
  import Scroll from '../../components/scroll/ScrollComponent.vue'
  import SportsItem from '../../sports/SportItems'
  import * as types  from '@/store/storeTypes'

  export default {
    components: {
      Scroll
    },
    data () {
      return {
        sports: []
      }
    },
    async created () {
      this.sports = await SportsItem.getSports()
      console.log(this.sports)
      this.$nextTick(() => {
        this.$refs.scroll.scrollUpdate()
      })
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scroll.scrollUpdate()
      })
    },
    methods: {
      onClickSport (sport) {
        this.$store.commit(types.SET_CURRENT_SPORTS, sport)
        this.$emit('click', sport)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .sports-setting {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: inline-block;
    .sports-card-container {
      display: flex;
      width: max-content;
      height: fit-content;
      margin-top: 60px;
      padding: 0 50px 0 50px;
    }
    .sport-card {
      position: relative;
      background-color: rgba(255, 235, 205, 0.141);
      margin-right: 10px;
      display: inline-flex;
      flex-direction: column;
      width: 450px;
      height: 550px;
      overflow: hidden;
      font-size: 50px;
      align-items: center;
      justify-content: center;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
  </style>