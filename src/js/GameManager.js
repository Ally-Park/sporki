class GameManager {
  constructor () {
  }
  
  // 경기 영상 존재 유무
  checkGameVideoExist (id) {
    console.log('id::', id)
    if (id === 'overseas-baseball' ||  id === 'basketball' || id === 'common') {
      return false
    } else {
      return true
    }
  }
  
  static getInstance () {
    if (!this.$instance) {
      this.$instance = new GameManager()
    }
    return this.$instance
  }
  

}

export default GameManager