import send from '../reqeust/Send'

export default {
  /**
   * @description 경기 일정 리스트 (주차 포함)
   */
  getGameSchedule (game, year, month) {
    console.log(game)
    return send({
      url: `/sports/v1/${game}/schedule/weekly`,
      method: 'get',
      params: {
        year: year,
        month: month
      }
    })
  },
  /**
   * @description 경기 상세 (스코어보드 포함)
   */
  getGameDetail (game, gameSeq) {
    return send({
      url: `/sports/v1/${game}/game/${gameSeq}`,
      method: 'get'
    })
  },
  /**
   * @description 라이브 중, 예정 경기 리스트
   */
  getLiveSchedule (game) {
    return send({
      url: `/sports/v1/${game}/schedule/live`,
      method: ''
    })
  }
}