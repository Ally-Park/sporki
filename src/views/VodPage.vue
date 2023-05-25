<template>
    <div class="vod-page">
      <div class="type-button-container">
        <button @click="onClickButton('all', $event)">전체</button>
        <button @click="onClickButton('date', $event)">날짜별</button>
        <button @click="onClickButton('theme', $event)">테마별</button>
      </div>
      <div class="vod-list-container">
        <Scroll ref="scroll"  @scrollStart="onScrollStart" @scrollTop="onScrollTop">
          <div class="vod-list-box">
            <div  v-for="i in 10" :key="i" class="vod-box">
              <VodCard></VodCard>
            </div>
          </div>
        </Scroll>
        <div class="floating-btn" v-if="showFloatingBtn" @click="moveTop">
          <img src="../images/top.png" alt="">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Scroll from '@/components/scroll/ScrollComponent.vue';
  import VodCard from '@/components/vod/VodCard.vue';
  // import CalendarBox from '@/components/Calendar/CalendarBox.vue';
  export default {
    components: {
      VodCard,
      Scroll,
      
    },
    data () {
      return {
        showFloatingBtn: false
      }
    },
    created () {
      this.$nextTick(() => {
        const el = document.getElementsByClassName('type-button-container')[0].children
        el[0].classList.add('selected')
        this.$refs.scroll.scrollUpdate()
      })
    },
    methods: {
      onClickButton (type, event) {
        const el = document.getElementsByClassName('type-button-container')[0].children
        for(let i of el) {
          if (i.classList.contains('selected')) {
            i.classList.remove('selected')
          }
        }
        event.currentTarget.classList.add('selected')
        switch (type) {
          case 'all':
            break
          case 'date':
            break
          case 'theme':
            break
          default:
            break
        }
      },
      moveTop () {
        this.$refs.scroll.moveAt(0,0)
        this.showFloatingBtn = false
      },
      onScrollStart () {
        this.showFloatingBtn = true
      },
      onScrollTop () {
        this.showFloatingBtn = false
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .vod-page {
    float: left;
    height: 100%;
    width: 1360px;
    overflow: hidden;
    .type-button-container {
      width: 538px;
      display: flex;
      justify-content: space-between;
      button {
        font-family: 'Noto Sans KR';
        font-size: 30px;
        font-weight: normal;
        letter-spacing: -1px;
        width: 166px;
        height: 70px;
        border-radius: 8px;
        border: solid 2px rgba(255, 255, 255, 0.1);
        background-color: #38393f;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.4);
      }

      button.selected {
        color: rgba(255, 255, 255, 1);
      }
    }
    .vod-list-container {
      position: relative;
      margin-top: 30px;
      height: 700px;
      // display: flex;
      .vod-list-box {        
        display: flex;
        flex-wrap: wrap;
        .vod-box {
          margin-right: 30px;
        }
      }
      .floating-btn {
        position: absolute;
        right: 76px;
        bottom: 33px;
        width: 120px;
        height: 120px;
      } 
    }
  }
  </style>