<template>
    <div class="baseball-game-detail">
      <!-- <div>
        경기중
      </div>
      <div>
        시간
      </div>
      <div>
        팀정보
      </div>
      <div>
        스코어보드
      </div> -->
    </div>
  </template>
  
  <script>
  export default {
    components: {
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .baseball-game-detail {
    width: 1034px;
    height: 582px;
    border-radius: 16px;
    border-style: solid;
    border-width: 3px;
    
    // opacity: 0.5;
    // border-image-source: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);;
    border-image-source: linear-gradient(to bottom, #7c848c 0%, rgba(55, 59, 63, 0) 100%);
    border-image-slice: 1;
    // background-image: linear-gradient(135deg, #252628 0%, #0c0d0e 100%), linear-gradient(to bottom, #7c848c 0%, rgba(55, 59, 63, 0) 100%);
    background-image: linear-gradient(119deg, #252628 0%, #0c0d0e 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  </style>