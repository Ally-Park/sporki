<template>
    <div class="vod-card">
      <div class="thumnail-img">
        <img class="image" />
        <span class="play-time">{{ '00:00' }}</span>
      </div>
      <div class="vod-title">{{ '영상에 해당하는 타이틀 영역 최대 2줄까지 노출하하하하하' }}</div>
    </div>
  </template>

  <script>

  export default {
    components: {
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .vod-card {
    width: 310px;
    height: 278px;
    border-radius: 16px;
    border-style: solid;
    border-width: 3px;
    border-image-source: linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #1e1e1e, #1e1e1e), linear-gradient(to bottom, #373b3f 0%, rgba(55, 59, 63, 0) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 32px;

    .thumnail-img {
      position: relative;
      background-color: black;
      width: 250px;
      height: 138px;
      margin-bottom: 20px;

      span {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-family: 'Roboto';
        font-size: 20px;
        letter-spacing: -1px;
      }
    }

    .vod-title {
      font-family: 'Noto Sans KR';
      width: 236px;
      font-size: 24px;
      font-weight: 500;
      line-height: 1;
      letter-spacing: -1px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  </style>