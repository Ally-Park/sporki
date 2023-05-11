import send from '../reqeust/Send'

export default {
  /**
   * @description 영상 목록 (전체, 날짜별)
   */
  getVodList (code) {
    return send({
      url: '/contents/v1/vod',
      method: 'get',
      params: {
        sportsCode : code,
        // limit: 50
      }
    })
  },
  /**
   * @description 영상 상세
   */
  getVodDetail (vodSeq) {
    return send({
      url: `/contents/v1/vod/${vodSeq}`,
      method: 'get'
    })
  },
  /**
   * @description 경기별 영상 목록
   */

  getGameVod (gameSeq) {
    return send({
      url: `/contents/v1/vod/${gameSeq}`,
      method: 'get'
    })

  }
}