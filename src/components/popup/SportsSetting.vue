<template>
    <div class="sports-setting">
      <div class="header">
        <img src="@/images/close.png" @click="onClickButton('cancel')">
        <p>종목 선택</p>
      </div>
      <div class="sports-card-container">
        <div class="sports-card" @click="onClick('sporki', $event)">
          <div class="sporki"></div>
          <p>스포키 LIVE</p>
        </div>
        <div class="sports-card" @click="onClick('kbaseball', $event)">
          <div class="kbaseball"></div>
          <p>야구</p>
        </div>
        <div class="sports-card" @click="onClick('wfootball', $event)">
          <div class="wfootball"></div>
          <p>해외 축구</p>
        </div>
        <div class="sports-card"  @click="onClick('volleyball', $event)">
          <div class="volleyball"></div>
          <p>배구</p>
        </div>
        <div class="sports-card" @click="onClick('billiards', $event)">
          <div class="billiards"></div>
          <p>당구</p>
        </div>
      </div>
      <div class="footer">
        <button @click="onClickButton('ok')">확인</button>
        <button @click="onClickButton('cancel')">취소</button>
      </div>
    </div>
  </template>
  
  <script>
  import * as types  from '@/store/storeTypes'

  export default {
    async created () {
      // TODO: current sport selected effect
    },
    data () {
      return {
        selectedSport: ''
      }
    },
    methods: {
      // onClickSport (sport) {
      //   this.$store.commit(types.SET_CURRENT_SPORTS, sport)
      //   this.$emit('click', sport)
      // },
      onClick (sport, event) {
        this.resetEffect()
        event.currentTarget.classList.add('active')
        const el = document.getElementsByClassName(sport)[0]
        el.classList.add('active')
      },
      resetEffect () {
        const el = document.getElementsByClassName('sports-card')
        console.log(el)
        for (let i of el) {
          if (i.classList.contains('active')) {
            i.classList.remove('active')
            i.firstChild.classList.remove('active')
          }
        }
      },
      onClickButton (type) {
        if (type === 'ok') {
          // 확인
          this.$store.commit(types.SET_CURRENT_SPORTS, this.selectedSport)
          this.$emit('click')
        } else {
          // 취소
          this.$emit('click')
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .sports-setting {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #22252b;

    .header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 160px;
      width: 1756px;
      margin-bottom: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      img {
        position: absolute;
        left: 30px;
      }
      p {
        font-size: 46px;
        font-weight: bold;
      }
    }
    .sports-card-container {
      display: flex;
      justify-content: space-evenly;
      gap: 25px;
    }
    .sports-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 320px;
      height: 369px;
      border-radius: 16px;
      border: 1px solid;
      border-image-source: linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #1e1e1e, #1e1e1e), linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      box-sizing: border-box;

      div {
        margin-top: 78px;
        width: 100%;
        height: 120px;
      }
      p {
        font-size: 38px;
        font-weight: 500;
        margin-bottom: 78px;
      }
      .sporki { 
        background: url('~@/images/svgs/spoky_normal.svg') no-repeat center;
      }
      .sporki.active {
        background: url('~@/images/svgs/spoky_press.svg') no-repeat center;
      }
      .kbaseball {
        background: url('~@/images/svgs/baseball_normal.svg') no-repeat center;
      }
      .kbaseball.active {
        background: url('~@/images/svgs/baseball_press.svg') no-repeat center;
      }
      .wfootball {
        background: url('~@/images/svgs/soccer_normal.svg') no-repeat center;
      }
      .wfootball.active {
        background: url('~@/images/svgs/soccer_press.svg') no-repeat center;
      }
      .volleyball {
        background: url('~@/images/svgs/volleyball_normal.svg') no-repeat center;
      }
      .volleyball.active {
        background: url('~@/images/svgs/volleyball_press.svg') no-repeat center;
      }
    }

    .sports-card.active {
      border: solid 3px rgba(240, 215, 187, 0.4);
      background-image: linear-gradient(139deg, #3b3834 0%, #0c0d0e 100%);
    }
    
    .footer {
      display: flex;
      gap: 40px;
      margin-top: 60px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 440px;
        height: 120px;
        border-radius: 16px;
        background-color: #38393f;
        font-size: 46px;
        font-weight: bold;
        color: #fff;
      }
      button:active {
        opacity: 0.5;
      }
    }
  }
  </style>