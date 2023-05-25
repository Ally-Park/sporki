<template>
    <div class="baseball-game-detail">
      <div class="game-status">
        {{ '경기중' }}
      </div>
      <div class="game-info">
        {{ '04.14 / 12:50 / 수원' }}
      </div>
      <div class="team-info">
        <div class="team">
          <img />
          <div class="team-name">{{ 'SK 와이번스' }}</div>
        </div>
        <div class="score" style="margin-left:45px; margin-right: 16px;"> {{ '-' }}</div>
        <span>vs</span>
        <div class="score" style="margin-left:16px; margin-right: 45px;"> {{ '-' }}</div>
        <div class="team home">
          <img />
          <div class="team-name">{{ '롯데 자이언츠' }}</div>
        </div>
      </div>
      <div class="score-board-container">
        <ScoreBoard></ScoreBoard>
      </div>
    </div>
  </template>
  
  <script>
  import ScoreBoard from './BaseballScoreBoard.vue'
  export default {
    components: {
      ScoreBoard
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .baseball-game-detail {
    position: relative;
    width: 1034px;
    height: 582px;
    border-radius: 16px;
    border-style: solid;
    border-width: 3px;
    border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    background-image: linear-gradient(to bottom, #252628 0%, #0c0d0e 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .game-status {
      font-size: 42px;
      font-weight: bold;
      line-height: 1;
      letter-spacing: -1px;
      color: #d5bda8;
      margin-bottom: 30px;
    }

    .game-info {
      font-size: 30px;
      font-weight: bold;
      line-height: 1;
      margin-bottom: 18px;
    }

    .team-info {
      display: flex;
      align-items: center;
      height: 160px;

      span {
        font-size: 40px;
        font-weight: bold;
        line-height: 1;
        letter-spacing: -1px;
      }
      .team {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 120px;
          height: 120px;
        }
        .team-name {
          font-size: 30px;
          font-weight: bold;
          line-height: 1;
          letter-spacing: -1px;
          margin-top: 10px;
        }
      }

      .team.home::after {
        content: '홈';
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        font-size: 20px;
        font-weight: 900;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 7px;
        bottom: -50px
      }

      .score {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80px;
        font-weight: bold;
        width: 120px;
        height: 120px;
        border-radius: 16px;
        border-style: solid;
        border-width: 3px;
        border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        background-image: linear-gradient(to bottom, #252628 0%, #0c0d0e 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
    }
    .score-board-container {
      margin-top: 80px;
    }

  }
  

  </style>